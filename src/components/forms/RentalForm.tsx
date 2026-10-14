"use client";

import { useSearchParams } from "next/navigation";
import { rentalDevices } from "@/data/company";
import { Button } from "../Button";
import { FormGroup, SelectField, TextareaField, TextField } from "./fields";
import { FormAlert, FormSuccess } from "./FormStatus";
import { useInquiry } from "./useInquiry";

const labels: Record<string, string> = {
  name: "Full name",
  email: "Email",
  phone: "Phone",
  device: "Device",
  quantity: "Quantity",
  startDate: "Start date",
  endDate: "End date",
};

const deviceOptions = rentalDevices.map((d) => ({ value: d.name, label: `${d.name} (${d.description.toLowerCase()})` }));

/** Prefills the device from links such as /rentals?device=iDATA%20K3%20Pro#rental-request. Wrap in Suspense. */
export function RentalFormFromLink() {
  const device = useSearchParams().get("device") ?? "";
  const valid = rentalDevices.some((d) => d.name === device);
  return <RentalForm key={device} device={valid ? device : undefined} />;
}

export function RentalForm({ device }: { device?: string }) {
  const { formRef, alertRef, status, errors, sentTo, onSubmit, onChange, reset } = useInquiry("rental");

  if (status === "success") {
    return <FormSuccess title="Thank you, your rental request has been sent" email={sentTo} onReset={reset} />;
  }

  const submitting = status === "submitting";

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} onChange={onChange} aria-label="Rental request">
      <p className="text-body-s text-text-muted mb-8">
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
          <TextField id="phone" label="Phone" type="tel" required autoComplete="tel" helper="Mobile or landline." error={errors.phone} />
        </FormGroup>

        <FormGroup title="Rental details">
          <SelectField
            id="device"
            label="Device"
            required
            options={deviceOptions}
            placeholder="Select a device"
            defaultValue={device}
            error={errors.device}
          />
          <TextField id="quantity" label="Quantity" type="number" inputMode="numeric" min={1} step={1} required error={errors.quantity} />
          <TextField id="startDate" label="Start date" type="date" required error={errors.startDate} />
          <TextField id="endDate" label="End date" type="date" required error={errors.endDate} />
          <div className="sm:col-span-2">
            <TextareaField
              id="notes"
              label="Notes"
              placeholder="Anything we should know, such as delivery location or accessories."
              error={errors.notes}
            />
          </div>
        </FormGroup>

        <div aria-hidden="true" className="hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Button type="submit" loading={submitting} className="sm:min-w-48">
            {submitting ? "Sending…" : "Send rental request"}
          </Button>
          <p className="text-body-s text-text-muted">We use your details only to reply to this request.</p>
        </div>
      </fieldset>
    </form>
  );
}
