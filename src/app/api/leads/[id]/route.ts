import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentAdminSession } from "@/lib/auth";
import { updateLeadStatusSchema } from "@/lib/validations";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const parse = updateLeadStatusSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json({ error: "Invalid status or input", details: parse.error.flatten() }, { status: 400 });
    }

    const updated = await prisma.lead.update({
      where: { id },
      data: {
        status: parse.data.status,
        ...(parse.data.internalNotes !== undefined && { internalNotes: parse.data.internalNotes }),
      },
    });

    return NextResponse.json({ success: true, lead: updated });
  } catch (err) {
    console.error("Error updating lead:", err);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.lead.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Lead removed" });
  } catch (err) {
    console.error("Error deleting lead:", err);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
