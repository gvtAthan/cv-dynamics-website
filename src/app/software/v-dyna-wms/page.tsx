import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { Badge, EmptyState, FeatureGrid, PageHero, Section, SectionHeader } from "@/components/ui";
import type { Feature } from "@/data/company";

export const metadata: Metadata = {
  title: "V-Dyna WMS",
  description:
    "V-Dyna WMS helps businesses streamline warehouse operations, improve inventory accuracy and manage the movement and storage of goods.",
};

const benefits: Feature[] = [
  { icon: "process", title: "Streamlined operations", text: "Run day-to-day warehouse work with fewer manual steps." },
  { icon: "check-circle", title: "Inventory accuracy", text: "Keep stock records accurate and up to date." },
  { icon: "truck", title: "Movement and storage", text: "Manage how goods move and where they are stored." },
  { icon: "chart", title: "Visibility", text: "See what is in your warehouse at any time." },
];

export default function VDynaPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Software", href: "/software" }, { label: "V-Dyna WMS" }]}
        logo={
          <div className="bg-bg-inverse mb-6 inline-flex rounded-md px-4 py-3">
            <Image src="/images/logos/vdyna-wms-white.png" alt="" width={524} height={170} className="h-10 w-auto" />
          </div>
        }
        title="V-Dyna WMS"
        text="V-Dyna WMS packages help businesses streamline warehouse operations, improve inventory accuracy and efficiently manage the movement and storage of goods."
        actions={
          <>
            <ButtonLink href="/contact?type=demo&product=V-Dyna%20WMS">Book a demo</ButtonLink>
            <ButtonLink href="/contact?type=quote&product=V-Dyna%20WMS" variant="secondary">
              Talk to sales
            </ButtonLink>
          </>
        }
        aside={
          <Image
            src="/images/images/vdyna-wms-laptop.jpg"
            alt="V-Dyna WMS dashboard on a laptop"
            width={940}
            height={520}
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-auto w-full rounded-lg"
          />
        }
      />

      <Section labelledBy="wms-benefits">
        <SectionHeader
          id="wms-benefits"
          overline="What it does"
          title="Better control, visibility and efficiency"
          text="Advanced warehouse features at an affordable price."
        />
        <FeatureGrid items={benefits} />
      </Section>

      <Section tone="subtle" labelledBy="wms-packages">
        <SectionHeader
          id="wms-packages"
          overline="Packages"
          title="V-Dyna WMS packages"
          text="Choose the package that fits the size of your warehouse."
        />
        {/* Content needed from C&V: package names and pricing. */}
        <EmptyState
          icon="box"
          title="Package details coming soon"
          text="Packages and pricing are being finalised. Book a demo and we will recommend the right package for your warehouse."
          action={<ButtonLink href="/contact?type=demo&product=V-Dyna%20WMS">Book a demo</ButtonLink>}
          badge={<Badge tone="warning">Content needed: package names and pricing</Badge>}
        />
      </Section>

      <CtaBand />
    </>
  );
}
