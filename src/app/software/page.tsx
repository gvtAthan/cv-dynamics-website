import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { SoftwareCard } from "@/components/cards";
import { CtaBand } from "@/components/CtaBand";
import { PageHero, Section } from "@/components/ui";
import { software } from "@/data/company";

export const metadata: Metadata = {
  title: "Software",
  description: "V-Dyna WMS for warehouses and C-Dyna POS for retail stores, built and supported by C&V Dynamics.",
};

export default function SoftwarePage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Software" }]}
        overline="Software"
        title="Software that runs your operations"
        text="Two systems built by C&V: V-Dyna WMS for warehouses and C-Dyna POS for retail stores."
        actions={<ButtonLink href="/contact?type=demo">Book a demo</ButtonLink>}
      />
      <Section>
        <h2 className="sr-only">Our systems</h2>
        <ul className="grid gap-6 lg:grid-cols-2">
          {software.map((s) => (
            <li key={s.name}>
              <SoftwareCard item={s} />
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
