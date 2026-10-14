import { primaryPhone } from "@/data/site";
import { ButtonLink } from "./Button";

type CtaBandProps = {
  overline?: string;
  title?: string;
  text?: string;
};

/** Dark navy call-to-action band shown before the footer on most pages. */
export function CtaBand({
  overline = "Why partner with C&V",
  title = "Keep your supply chain moving",
  text = "Supply chains are the backbone of every business. We help your operations run smoother, faster and more efficiently.",
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-title" className="bg-bg-inverse text-text-inverse py-16 lg:py-24">
      <div className="container-page flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[640px]">
          <p className="text-overline text-text-inverse-muted mb-3">{overline}</p>
          <h2 id="cta-title" className="text-h2">
            {title}
          </h2>
          <p className="text-body-l text-text-inverse-muted mt-4">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact?type=quote" variant="inverse">
            Request a quote
          </ButtonLink>
          <ButtonLink href={primaryPhone.href} variant="inverse-secondary" icon="phone">
            Call {primaryPhone.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
