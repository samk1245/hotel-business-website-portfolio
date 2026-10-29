import { z } from "zod";

// Phone number regex accommodating Indian (+91 or 10-digit) and international standards
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;

export const leadSubmissionSchema = z.object({
  propertyName: z
    .string()
    .min(2, "Hotel / Property name must be at least 2 characters")
    .max(100, "Property name is too long"),
  contactName: z
    .string()
    .min(2, "Your name must be at least 2 characters")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid phone or WhatsApp number"),
  email: z
    .string()
    .email("Please provide a valid business email address"),
  city: z
    .string()
    .min(2, "Please provide the city / location of your property"),
  existingWebsite: z
    .string()
    .url("Please enter a valid URL (e.g. https://yourhotel.com)")
    .optional()
    .or(z.literal("")),
  roomCount: z
    .string()
    .optional()
    .or(z.literal("")),
  selectedPackage: z
    .string()
    .optional()
    .or(z.literal("")),
  selectedAddons: z
    .array(z.string())
    .optional()
    .default([]),
  estimatedBudget: z
    .string()
    .optional()
    .or(z.literal("")),
  preferredLaunchDate: z
    .string()
    .optional()
    .or(z.literal("")),
  additionalNotes: z
    .string()
    .max(2000, "Notes cannot exceed 2,000 characters")
    .optional()
    .or(z.literal("")),
  estimatedTotal: z
    .number()
    .nonnegative()
    .optional(),
  calculatedTimeframe: z
    .string()
    .optional(),
});

export type LeadSubmissionInput = z.infer<typeof leadSubmissionSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateLeadStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "IN_DISCUSSION", "CONVERTED", "ARCHIVED"]),
  internalNotes: z.string().max(3000).optional(),
});
