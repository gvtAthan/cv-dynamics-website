"use client";

import { useSearchParams } from "next/navigation";
import { inquiryTypes } from "@/data/company";
import { Button } from "../Button";
import { Checkbox, FormGroup, SelectField, TextareaField, TextField } from "./fields";
import { FormAlert, FormSuccess } from "./FormStatus";
import { useInquiry } from "./useInquiry";

const labels: Record<string, string> = {
  name: "Full name",
  email: "Email",
  phone: "Phone",
  type: "Inquiry type",
  message: "Message",
  consent: "Consent",
};

type Defaults = { type?: string; product?: string };

/** Prefills the form from links such as /contact?type=quote&product=iDATA%20K3%20Pro. Wrap in Suspense. */
export function ContactFormFromLink() {
  const params = useSearchParams();
  const type = params.get("type") ?? "";
  const product = (params.get("product") ?? "").slice(0, 200);
  return (
    <ContactForm
      key={`${type}|${product}`}
      defaults={{ type: inquiryTypes.some((t) => t.value === type) ? type : undefined, product }}
    />
  );
}

export function ContactForm({ defaults = {} }: { defaults?: Defaults }) {
  const { formRef, alertRef, status, errors, sentTo, onSubmit, onChange, reset } = useInquiry("contact");

  if (status === "success") {
    return <FormSuccess title="Thank you, your inquiry has been sent" email={sentTo} onReset={reset} />;
  }

  const submitting = status === "submitting";

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} onChange={onChange} aria-labelledby="contact-form-title">
      <h2 id="contact-form-title" className="text-h3">
        Send an inquiry
      </h2>
      <p className="text-body-s text-text-muted mt-2 mb-8">
        Fields marked <span className="text-text-danger">*</span> are required.
      </p>

      <div className="mb-8">
        <FormAlert status={status} errors={errors} labels={labels} alertRef={alertRef} />
      </div>

      <fieldset disabled={submitting} className="flex flex-col gap-10">
        <FormGroup title="Your details">
          <TextField id="name" label="Full name" required autoComplete="name" placeholder="Juan dela Cruz" error={errors.name} />
          <TextField id="company" label="Company" autoComplete="organization" error={errors.company} />
          <TextField
            id="email"
            label="Email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@company.com"
            error={errors.email}
          />
          <TextField
            id="phone"
            label="Phone"
            type="tel"
            required
            autoComplete="tel"
            helper="Mobile or landline."
            error={errors.phone}
          />
        </FormGroup>

        <FormGroup title="Your inquiry">
          <SelectField
            id="type"
            label="Inquiry type"
            required
            options={inquiryTypes}
            defaultValue={defaults.type}
            error={errors.type}
          />
          <TextField
            id="product"
            label="Product of interest"
            placeholder="e.g. iDATA K3 Pro"
            defaultValue={defaults.product}
            error={errors.product}
          />
          <div className="sm:col-span-2">
            <TextareaField id="message" label="Message" required placeholder="How can we help?" error={errors.message} />
          </div>
        </FormGroup>

        <div aria-hidden="true" className="hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-col gap-6">
          <Checkbox id="consent" label="I agree to be contacted about my inquiry." required error={errors.consent} />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Button type="submit" loading={submitting} className="sm:min-w-48">
              {submitting ? "Sending…" : "Send inquiry"}
            </Button>
            <p className="text-body-s text-text-muted">We use your details only to reply to this inquiry.</p>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
