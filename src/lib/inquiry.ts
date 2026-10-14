import { inquiryTypes, rentalDevices } from "@/data/company";

/** Validation shared by the forms (client) and /api/contact (server). */

export type InquiryKind = "contact" | "rental";
export type Values = Record<string, string>;
export type Errors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const required = (v: Values, field: string, message: string, errors: Errors) => {
  if (!v[field]?.trim()) errors[field] = message;
};

function validateDetails(v: Values, errors: Errors) {
  required(v, "name", "Enter your full name.", errors);
  if (!v.email?.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL.test(v.email.trim())) errors.email = "Enter an email address like name@company.com.";
  const digits = (v.phone ?? "").replace(/[\s()+.-]/g, "");
  if (!digits) errors.phone = "Enter a phone number.";
  else if (!/^\d{7,15}$/.test(digits)) errors.phone = "Enter a valid mobile or landline number.";
}

export function validate(kind: InquiryKind, v: Values): Errors {
  const errors: Errors = {};
  validateDetails(v, errors);

  if (kind === "contact") {
    if (!inquiryTypes.some((t) => t.value === v.type)) errors.type = "Choose an inquiry type.";
    required(v, "message", "Tell us how we can help.", errors);
    if (v.consent !== "on" && v.consent !== "true") errors.consent = "Tick the box so we can reply to you.";
  } else {
    if (!rentalDevices.some((d) => d.name === v.device)) errors.device = "Choose a device.";
    const qty = Number(v.quantity);
    if (!v.quantity?.trim()) errors.quantity = "Enter a quantity.";
    else if (!Number.isInteger(qty) || qty < 1) errors.quantity = "Enter a whole number of 1 or more.";
    required(v, "startDate", "Choose a start date.", errors);
    required(v, "endDate", "Choose an end date.", errors);
    if (!errors.startDate && !errors.endDate && v.endDate < v.startDate)
      errors.endDate = "The end date must be on or after the start date.";
  }

  for (const [field, value] of Object.entries(v)) {
    if (value.length > 5000) errors[field] = "This is too long.";
  }
  return errors;
}

/** Field order and labels for the email the team receives. */
export const fieldLabels: Record<InquiryKind, [string, string][]> = {
  contact: [
    ["type", "Inquiry type"],
    ["name", "Name"],
    ["company", "Company"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["product", "Product of interest"],
    ["message", "Message"],
  ],
  rental: [
    ["name", "Name"],
    ["company", "Company"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["device", "Device"],
    ["quantity", "Quantity"],
    ["startDate", "Start date"],
    ["endDate", "End date"],
    ["notes", "Notes"],
  ],
};
