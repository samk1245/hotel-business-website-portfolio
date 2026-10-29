import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leadSubmissionSchema } from "@/lib/validations";
import { sendLeadNotificationEmail } from "@/lib/email";
import { getCurrentAdminSession } from "@/lib/auth";

// In-memory rate limiting map: ip -> timestamps
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  // Filter timestamps within last 10 minutes
  const recent = timestamps.filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 5) {
    return false; // exceeded 5 submissions per 10 mins
  }
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
    const userAgent = req.headers.get("user-agent") || "unknown-agent";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before submitting again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parseResult = leadSubmissionSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // Duplicate check: check if same phone and email submitted in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const existingRecent = await prisma.lead.findFirst({
      where: {
        email: data.email,
        phone: data.phone,
        createdAt: { gte: fiveMinutesAgo },
      },
    });

    if (existingRecent) {
      return NextResponse.json(
        {
          success: true,
          leadId: existingRecent.id,
          message: "We already received your inquiry and our hospitality consultant will call you shortly.",
        },
        { status: 200 }
      );
    }

    // Create lead in database
    const newLead = await prisma.lead.create({
      data: {
        propertyName: data.propertyName,
        contactName: data.contactName,
        phone: data.phone,
        email: data.email,
        city: data.city,
        existingWebsite: data.existingWebsite || null,
        roomCount: data.roomCount || null,
        selectedPackage: data.selectedPackage || null,
        selectedAddons: data.selectedAddons?.length ? JSON.stringify(data.selectedAddons) : null,
        estimatedBudget: data.estimatedBudget || null,
        preferredLaunchDate: data.preferredLaunchDate || null,
        additionalNotes: data.additionalNotes || null,
        estimatedTotal: data.estimatedTotal || null,
        calculatedTimeframe: data.calculatedTimeframe || null,
        status: "NEW",
        ipAddress: ip,
        userAgent: userAgent,
      },
    });

    // Send asynchronous transactional notification
    await sendLeadNotificationEmail({
      leadId: newLead.id,
      propertyName: newLead.propertyName,
      contactName: newLead.contactName,
      phone: newLead.phone,
      email: newLead.email,
      city: newLead.city,
      roomCount: newLead.roomCount || undefined,
      selectedPackage: newLead.selectedPackage || undefined,
      estimatedTotal: newLead.estimatedTotal || undefined,
      calculatedTimeframe: newLead.calculatedTimeframe || undefined,
      additionalNotes: newLead.additionalNotes || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        leadId: newLead.id,
        message: "Thank you! Your hotel website consultation request has been received. We will contact you within 4 business hours.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error submitting lead:", err);
    return NextResponse.json(
      { error: "Internal server error while processing your request. Please call or WhatsApp us directly." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    const whereClause: Record<string, unknown> = {};

    if (status && status !== "ALL") {
      whereClause.status = status;
    }

    if (search) {
      whereClause.OR = [
        { propertyName: { contains: search } },
        { contactName: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { city: { contains: search } },
      ];
    }

    const [total, leads] = await Promise.all([
      prisma.lead.count({ where: whereClause }),
      prisma.lead.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      leads,
    });
  } catch (err) {
    console.error("Error fetching leads:", err);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
