import type { Metadata } from "next";
import { Suspense } from "react";
import { ButtonLink } from "@/components/Button";
import { ProductCard } from "@/components/cards";
import { RentalForm, RentalFormFromLink } from "@/components/forms/RentalForm";
import { Badge, Frame, PageHero, Section, SectionHeader } from "@/components/ui";
import { rentalDevices } from "@/data/company";

export const metadata: Metadata = {
  title: "Rentals",
  description:
    "Rent iDATA scanners from C&V Dynamics. High-performance scanning and printing rentals tailored to your project requirements.",
};

const steps = [
  { title: "Tell us what you need", text: "Choose the devices, quantity and how long you need them." },
  { title: "Get a quote", text: "We confirm availability, rental terms and pricing." },
  { title: "Start working", text: "Receive your devices, set up and ready for your project." },
];

export default function RentalsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Rentals" }]}
        overline="Rentals"
        title="Reliable rentals"
        text="In addition to sales, we provide rental services tailored to your project requirements. Streamline your workflow with high-performance scanning and printing rentals."
        actions={
          <ButtonLink href="#rental-request" arrow>
            Ask about rentals
          </ButtonLink>
        }
        aside={
          <Frame
            src="/images/products/idata-t1-pro.jpg"
            alt="iDATA T1 Pro full-touch mobile computer"
            width={440}
            height={375}
            fit="contain"
            priority
            className="aspect-[4/3]"
          />
        }
      />

      <Section labelledBy="rentals-available">
        <SectionHeader id="rentals-available" overline="Available for rent" title="Devices you can rent today" />
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {rentalDevices.map((d) => (
            <li key={d.name}>
              <ProductCard
                product={d}
                cta="Ask about rentals"
                href={`/rentals?device=${encodeURIComponent(d.name)}#rental-request`}
                headingLevel={3}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="subtle" labelledBy="rentals-steps">
        <SectionHeader id="rentals-steps" overline="How it works" title="Renting in three steps" />
        <ol className="grid gap-6 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="border-border-default bg-bg-page flex flex-col gap-3 rounded-lg border p-6">
              <span className="bg-action-primary text-text-inverse text-h4 inline-flex size-12 items-center justify-center rounded-full">
                {i + 1}
              </span>
              <h3 className="text-h4">{s.title}</h3>
              <p className="text-body-m text-text-secondary">{s.text}</p>
            </li>
          ))}
        </ol>
        {/* Content needed from C&V: minimum rental period, deposit and delivery terms. */}
        <div className="mt-6">
          <Badge tone="warning">Content needed: rental terms</Badge>
        </div>
      </Section>

      <section id="rental-request" aria-labelledby="rental-request-title" className="scroll-mt-20 py-16 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <p className="text-overline text-text-link mb-3">Rental request</p>
            <h2 id="rental-request-title" className="text-h2">
              Ask about rentals
            </h2>
            <p className="text-body-l text-text-secondary mt-4">
              Tell us what you need and for how long. We will reply with availability and terms.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Suspense fallback={<RentalForm />}>
              <RentalFormFromLink />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
