import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { Checklist, FeatureGrid, Frame, PageHero, Section, SectionHeader } from "@/components/ui";
import type { Feature } from "@/data/company";

export const metadata: Metadata = {
  title: "C-Dyna POS",
  description: "C-Dyna POS is an order and inventory management system for retail stores. Beyond the ordinary POS.",
};

const highlights: Feature[] = [
  { icon: "dashboard", title: "Centralized dashboard", text: "Sales, stock and reports in one place." },
  {
    icon: "sync",
    title: "Real-time, offline-first sync",
    text: "Keep selling when the connection drops; data syncs when it is back.",
  },
  { icon: "box", title: "Inventory management", text: "Track stock from receiving to the shelf." },
];

const salesFeatures = [
  "Employee profiling",
  "Attendance and ID layout",
  "Reseller transactions",
  "Sales quotations",
  "Data analytics",
  "AI assistant",
  "System integration",
];

const inventoryFeatures = [
  "Batch receiving of goods",
  "Stock transfer",
  "Low stock alerts",
  "Automatic purchase requests",
  "Return to supplier",
  "Inventory audit",
  "Barcode generator",
];

const hardware = [
  "Touchscreen POS terminal",
  "Receipt printer and cash drawer",
  "Tablet",
  "Barcode scanner",
  "Security cameras",
];

export default function CDynaPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Software", href: "/software" }, { label: "C-Dyna POS" }]}
        logo={
          <Image
            src="/images/logos/cdyna-pos-color.png"
            alt=""
            width={584}
            height={200}
            className="mb-6 h-14 w-auto"
          />
        }
        title="C-Dyna POS"
        text="Order and inventory management system. Beyond the ordinary POS."
        actions={
          <>
            <ButtonLink href="/contact?type=demo&product=C-Dyna%20POS">Book a demo</ButtonLink>
            <ButtonLink href="/contact?type=quote&product=C-Dyna%20POS" variant="secondary">
              Talk to sales
            </ButtonLink>
          </>
        }
        aside={
          <Frame
            src="/images/images/cdyna-dashboard-analytics.jpg"
            alt="C-Dyna POS analytics dashboard"
            width={640}
            height={356}
            priority
          />
        }
      />

      <Section labelledBy="pos-highlights">
        <SectionHeader id="pos-highlights" overline="Advanced features" title="Built for busy stores" />
        <FeatureGrid items={highlights} columns={3} />
      </Section>

      <Section tone="subtle" labelledBy="pos-features">
        <SectionHeader id="pos-features" overline="All features" title="Everything in C-Dyna POS" />
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            { title: "Sales and people", items: salesFeatures },
            { title: "Inventory", items: inventoryFeatures },
          ].map((group) => (
            <div key={group.title} className="border-border-default bg-bg-page rounded-lg border p-6 lg:p-8">
              <h3 className="text-h4 mb-5">{group.title}</h3>
              <Checklist items={group.items} className="sm:grid sm:grid-cols-2 sm:gap-x-6" />
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="pos-dashboards">
        <SectionHeader id="pos-dashboards" overline="Dashboards" title="Clear numbers, every day" />
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            { src: "/images/images/cdyna-dashboard-analytics.jpg", w: 640, h: 356, caption: "Analytics dashboard" },
            { src: "/images/images/cdyna-dashboard-sales.jpg", w: 645, h: 360, caption: "Sales details" },
          ].map((d) => (
            <figure key={d.caption}>
              <Frame src={d.src} alt={`C-Dyna POS ${d.caption.toLowerCase()}`} width={d.w} height={d.h} />
              <figcaption className="text-body-s text-text-muted mt-3">{d.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section tone="subtle" labelledBy="pos-hardware">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <SectionHeader
              id="pos-hardware"
              overline="Hardware"
              title="Works with the hardware you need"
              className="!mb-8"
            />
            <Checklist items={hardware} />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Frame
              src="/images/images/cdyna-pos-hardware.jpg"
              alt="POS hardware set: touchscreen terminal, receipt printer, cash drawer, tablet and scanner"
              width={1053}
              height={935}
              fit="contain"
            />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
