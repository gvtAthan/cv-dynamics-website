import { inquiryTypes } from "@/data/company";
import { site } from "@/data/site";
import { fieldLabels, validate, type InquiryKind, type Values } from "@/lib/inquiry";

/**
 * Receives the Contact and Rental forms and emails them to the team through Resend.
 * Needs RESEND_API_KEY and CONTACT_TO_EMAIL (see README). Without them it answers 503
 * and the form tells the visitor to call or email instead.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object") return Response.json({ error: "Invalid request." }, { status: 400 });

  const raw = body as Record<string, unknown>;
  const kind: InquiryKind = raw.kind === "rental" ? "rental" : "contact";
  const values: Values = {};
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "string") values[key] = value.trim();
    else if (typeof value === "boolean") values[key] = String(value);
  }

  // Honeypot: real visitors never see or fill this field.
  if (values.website) return Response.json({ ok: true });

  const errors = validate(kind, values);
  if (Object.keys(errors).length > 0) return Response.json({ errors }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const typeLabel = inquiryTypes.find((t) => t.value === values.type)?.label;
  const subject =
    kind === "rental"
      ? `Rental request: ${values.device} × ${values.quantity} from ${values.name}`
      : `Website inquiry (${typeLabel}) from ${values.name}`;
  const text = fieldLabels[kind]
    .filter(([field]) => values[field])
    .map(([field, label]) => `${label}: ${field === "type" ? typeLabel : values[field]}`)
    .join("\n\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? `${site.shortName} website <onboarding@resend.dev>`,
      to: to.split(",").map((s) => s.trim()),
      reply_to: values.email,
      subject,
      text: `${text}\n\nSent from the contact form on ${site.domainLabel}`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
