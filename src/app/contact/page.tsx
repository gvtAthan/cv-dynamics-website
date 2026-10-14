import type { Metadata } from "next";
import { Suspense } from "react";
import { ButtonLink } from "@/components/Button";
import { ContactForm, ContactFormFromLink } from "@/components/forms/ContactForm";
import { Icon, type IconName } from "@/components/Icon";
import { Badge, PageHero } from "@/components/ui";
import { primaryPhone, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ask C&V Dynamics for a quote, a rental, a software demo or support. Call (049) 550 4404 or send us a message.",
};

function Detail({ icon, title, children }: { icon: IconName; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="bg-bg-brand-subtle text-icon-accent inline-flex size-10 shrink-0 items-center justify-center rounded-md">
        <Icon name={icon} size={20} />
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="text-body-s text-text-muted font-semibold">{title}</h3>
        {children}
      </div>
    </div>
  );
}

const linkClass = "focus-ring text-body-m text-text-primary hover:text-text-link rounded-sm underline-offset-4 hover:underline";

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        overline="Contact"
        title="Talk to our team"
        text="Ask for a quote, a rental, a software demo or support. Send us a message and our team will get back to you."
      />

      <section className="py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <Suspense fallback={<ContactForm />}>
              <ContactFormFromLink />
            </Suspense>
          </div>

          <aside aria-labelledby="contact-details-title" className="lg:col-span-4 lg:col-start-9">
            <div className="bg-bg-subtle flex flex-col gap-6 rounded-lg p-6 lg:sticky lg:top-28 lg:p-8">
              <h2 id="contact-details-title" className="text-h4">
                Contact details
              </h2>
              <Detail icon="phone" title="Phone">
                {site.phones.map((p) => (
                  <a key={p.href} href={p.href} className={linkClass}>
                    {p.label}
                  </a>
                ))}
              </Detail>
              <Detail icon="mail" title="Email">
                {site.emails.map((e) => (
                  <a key={e.href} href={e.href} className={`${linkClass} break-all`}>
                    {e.label}
                  </a>
                ))}
              </Detail>
              <Detail icon="map-pin" title="Address">
                <address className="text-body-m not-italic">{site.address}</address>
              </Detail>
              <Detail icon="globe" title="Website">
                <span className="text-body-m">{site.domainLabel}</span>
              </Detail>
              <Detail icon="clock" title="Business hours">
                {site.businessHours ? (
                  <span className="text-body-m">{site.businessHours}</span>
                ) : (
                  <span>
                    <Badge tone="warning">Content needed</Badge>
                  </span>
                )}
              </Detail>

              <div className="border-border-default flex flex-col gap-3 border-t pt-6">
                <p className="text-body-m font-semibold">Prefer to talk now?</p>
                <ButtonLink href={primaryPhone.href} icon="phone">
                  Call {primaryPhone.label}
                </ButtonLink>
                <ButtonLink href={site.emails[0].href} variant="secondary" icon="mail">
                  Email sales
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
