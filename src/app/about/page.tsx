import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { FeatureGrid, Frame, PageHero, Section, SectionHeader } from "@/components/ui";
import { advantages, coreValues } from "@/data/company";

export const metadata: Metadata = {
  title: "About us",
  description:
    "C&V Dynamics Inc. supplies the equipment and systems that keep Philippine businesses moving, from micro enterprises to large corporations.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About us" }]}
        overline="About us"
        title="A dynamic partner for your supply chain"
        text="We supply the equipment and systems that keep Philippine businesses moving, from micro enterprises to large corporations."
        aside={
          <Frame
            src="/images/images/glass-ampersand.jpg"
            alt=""
            width={560}
            height={975}
            priority
            className="aspect-[4/3] lg:aspect-[4/5]"
          />
        }
      />

      <Section labelledBy="who-we-are">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <p className="text-overline text-text-link mb-3">Who we are</p>
            <h2 id="who-we-are" className="text-h2">
              Bridging suppliers and businesses
            </h2>
          </div>
          <div className="text-body-l text-text-secondary flex max-w-[640px] flex-col gap-5 lg:col-span-7">
            <p>
              C&amp;V Dynamics Inc. is a dynamic start-up distribution company committed to strengthening supply
              chain operations across the Philippines. We distribute high-quality products that support businesses
              ranging from micro enterprises to large corporations.
            </p>
            <p>
              As a forward-thinking company, we aim to bridge the gap between suppliers and businesses with
              reliable, efficient and scalable solutions. We focus not only on delivering products but also on
              improving operational efficiency through modern systems and process improvements.
            </p>
            <p>
              We are built on flexibility, competitiveness and customer-centered service. Every business has unique
              needs, so we tailor our approach to ensure consistent supply, timely delivery and cost-effective
              solutions.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="subtle" labelledBy="core-values">
        <SectionHeader
          id="core-values"
          overline="Core values"
          title="What DYNAMICS stands for"
          text="Eight values, one for each letter of our name, guide how we work with every client."
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((v) => (
            <li key={v.letter} className="border-border-default bg-bg-page flex flex-col gap-3 rounded-lg border p-6">
              <span
                aria-hidden="true"
                className="bg-action-primary text-text-inverse text-h4 inline-flex size-12 items-center justify-center rounded-md"
              >
                {v.letter}
              </span>
              <h3 className="text-h4">
                <span className="sr-only">{v.letter}, </span>
                {v.title}
              </h3>
              <p className="text-body-m text-text-secondary">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="about-advantage">
        <SectionHeader id="about-advantage" overline="Why C&V" title="Our competitive advantage" />
        <FeatureGrid items={advantages} />
      </Section>

      <CtaBand />
    </>
  );
}
