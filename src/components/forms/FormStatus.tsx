import { primaryPhone, site } from "@/data/site";
import { Button, ButtonLink } from "../Button";
import { Icon } from "../Icon";
import { Alert } from "./fields";
import type { Status } from "./useInquiry";
import type { Errors } from "@/lib/inquiry";
import type { RefObject } from "react";

const salesEmail = site.emails[0];

/** Alert shown above the form for validation or sending errors. */
export function FormAlert({
  status,
  errors,
  labels,
  alertRef,
}: {
  status: Status;
  errors: Errors;
  labels: Record<string, string>;
  alertRef: RefObject<HTMLDivElement | null>;
}) {
  const fields = Object.keys(errors);
  if (status === "error") {
    return (
      <div ref={alertRef} tabIndex={-1} className="focus:outline-none">
        <Alert tone="danger" title="We couldn't send your message">
          <p className="mt-1">
            Please try again, or call{" "}
            <a href={primaryPhone.href} className="text-text-link font-semibold underline">
              {primaryPhone.label}
            </a>{" "}
            or email{" "}
            <a href={salesEmail.href} className="text-text-link font-semibold underline">
              {salesEmail.label}
            </a>
            . Your details are still in the form.
          </p>
        </Alert>
      </div>
    );
  }
  if (fields.length === 0) return <div ref={alertRef} tabIndex={-1} />;
  return (
    <div ref={alertRef} tabIndex={-1} className="focus:outline-none">
      <Alert tone="danger" title={`Please check ${fields.length === 1 ? "1 field" : `${fields.length} fields`}`}>
        <ul className="mt-2 flex flex-col gap-1">
          {fields.map((f) => (
            <li key={f}>
              <a href={`#${f}`} className="text-text-link underline">
                {labels[f] ?? f}
              </a>
              : {errors[f]}
            </li>
          ))}
        </ul>
      </Alert>
    </div>
  );
}

export function FormSuccess({ title, email, onReset }: { title: string; email: string; onReset: () => void }) {
  return (
    <div role="status" className="border-border-success bg-bg-success-subtle flex flex-col items-start gap-4 rounded-lg border p-6 lg:p-8">
      <span className="bg-bg-page text-text-success inline-flex size-12 items-center justify-center rounded-full">
        <Icon name="check-circle" size={28} />
      </span>
      <h2 className="text-h3">{title}</h2>
      <p className="text-body-m text-text-secondary max-w-[560px]">
        Our team will get back to you at <strong className="text-text-primary">{email}</strong>. For urgent
        requests, call{" "}
        <a href={primaryPhone.href} className="text-text-link font-semibold underline">
          {primaryPhone.label}
        </a>
        .
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/products">Browse products</ButtonLink>
        <Button variant="secondary" onClick={onReset}>
          Send another message
        </Button>
      </div>
    </div>
  );
}
