import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Generate CSV string
    const headers = [
      "ID",
      "Date",
      "Property Name",
      "Contact Name",
      "Phone",
      "Email",
      "City",
      "Rooms",
      "Package",
      "Budget",
      "Est. Total (INR)",
      "Timeframe",
      "Status",
      "Notes",
    ];

    const escapeCsv = (val: unknown) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = leads.map((l) => [
      escapeCsv(l.id),
      escapeCsv(new Date(l.createdAt).toLocaleDateString("en-IN")),
      escapeCsv(l.propertyName),
      escapeCsv(l.contactName),
      escapeCsv(l.phone),
      escapeCsv(l.email),
      escapeCsv(l.city),
      escapeCsv(l.roomCount),
      escapeCsv(l.selectedPackage),
      escapeCsv(l.estimatedBudget),
      escapeCsv(l.estimatedTotal),
      escapeCsv(l.calculatedTimeframe),
      escapeCsv(l.status),
      escapeCsv(l.additionalNotes),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="hotel-leads-export-${Date.now()}.csv"`,
      },
    });
  } catch (err) {
    console.error("Error generating CSV export:", err);
    return NextResponse.json({ error: "Failed to generate CSV" }, { status: 500 });
  }
}
