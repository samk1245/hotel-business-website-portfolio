export interface LeadNotificationEmailData {
  propertyName: string;
  contactName: string;
  phone: string;
  email: string;
  city: string;
  roomCount?: string;
  selectedPackage?: string;
  estimatedTotal?: number;
  calculatedTimeframe?: string;
  additionalNotes?: string;
  leadId: string;
}

export async function sendLeadNotificationEmail(data: LeadNotificationEmailData): Promise<{ success: boolean; messageId?: string }> {
  const recipient = process.env.NOTIFICATION_RECIPIENT_EMAIL || "concierge@grandeurlabs.com";
  const fromEmail = process.env.EMAIL_FROM || "notifications@grandeurlabs.com";

  const emailSubject = `🔔 New Hotel Website Inquiry: ${data.propertyName} (${data.city})`;
  const emailText = `
New Hotel Lead Received!
-------------------------------------
Property: ${data.propertyName}
City: ${data.city}
Contact: ${data.contactName}
Phone / WhatsApp: ${data.phone}
Email: ${data.email}
Rooms: ${data.roomCount || "Not specified"}
Selected Package: ${data.selectedPackage || "Custom Inquiry"}
Estimated Total: ${data.estimatedTotal ? `₹${data.estimatedTotal.toLocaleString("en-IN")}` : "Calculated upon proposal"}
Estimated Timeframe: ${data.calculatedTimeframe || "Pending scope"}
Notes: ${data.additionalNotes || "None"}
Lead ID: ${data.leadId}
-------------------------------------
View & manage in Admin Dashboard: /admin/leads
`;

  // Check provider
  const provider = process.env.EMAIL_PROVIDER || "log";

  if (provider === "resend" && process.env.RESEND_API_KEY) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: recipient,
          subject: emailSubject,
          text: emailText,
        }),
      });
      const resJson = await response.json();
      return { success: response.ok, messageId: resJson.id };
    } catch (err) {
      console.error("[Email Notification Failed - Resend]", err);
      return { success: false };
    }
  }

  // Default fallback: Structured Server Log notification
  console.log("=================================================");
  console.log(`[TRANSACTIONAL EMAIL DISPATCHED] -> ${recipient}`);
  console.log(`SUBJECT: ${emailSubject}`);
  console.log(emailText);
  console.log("=================================================");

  return { success: true, messageId: `mock-${Date.now()}` };
}
