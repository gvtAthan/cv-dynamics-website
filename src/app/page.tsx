import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { CategoryCard, SoftwareCard } from "@/components/cards";
import { CtaBand } from "@/components/CtaBand";
import { Checklist, FeatureGrid, Frame, Section, SectionHeader } from "@/components/ui";
import { advantages, software } from "@/data/company";
import { categories } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <section className="bg-hero-dark text-text-inverse overflow-hidden py-16 lg:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <p className="text-overline text-text-inverse-muted mb-4">Product distribution · Wholesale &amp; retail</p>
            <h1 className="text-h1">Engineered to deliver</h1>
            <p className="text-body-l text-text-inverse-muted mt-5 max-w-[600px]">
              Scanners, printers, warehouse and supermarket equipment, plus our own warehouse and POS software, for
              businesses across the Philippines, from micro enterprises to large corporations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/products" variant="inverse">
                Explore products
              </ButtonLink>
              <ButtonLink href="/contact?type=quote" variant="inverse-secondary">
                Request a quote
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-6">
            <Image
              src="/images/images/vdyna-wms-laptop.jpg"
              alt="V-Dyna WMS dashboard on a laptop"
              width={940}
              height={520}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full rounded-lg"
            />
          </div>
        </div>
      </section>

      <Section labelledBy="home-products">
        <SectionHeader
          id="home-products"
          overline="Products"
          title="Everything your operations run on"
          text="Four product lines from trusted brands such as iDATA and Brother, sourced and supported by our team."
          action={
            <ButtonLink href="/products" variant="tertiary">
              View all products
            </ButtonLink>
          }
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <li key={c.id}>
              <CategoryCard category={c} />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="subtle" labelledBy="home-software">
        <SectionHeader
          id="home-software"
          overline="Software"
          title="Systems built for warehouse and retail"
          text="Our own software, set up for your operations and supported locally."
        />
        <ul className="grid gap-6 lg:grid-cols-2">
          {software.map((s) => (
            <li key={s.name}>
              <SoftwareCard item={s} />
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="home-advantage">
        <SectionHeader id="home-advantage" overline="Why C&V" title="Our competitive advantage" />
        <FeatureGrid items={advantages} />
      </Section>

      <Section tone="brand" labelledBy="home-rentals">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <SectionHeader
              id="home-rentals"
              overline="Rentals"
              title="Reliable rentals for your projects"
              text="Streamline your workflow with high-performance scanning and printing rentals, tailored to your project requirements."
              className="!mb-8"
            />
            <Checklist items={["iDATA K3 Pro keypad mobile computer", "iDATA T1 Pro full-touch mobile computer"]} />
            <ButtonLink href="/rentals" className="mt-8" arrow>
              Ask about rentals
            </ButtonLink>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Frame
              src="/images/products/idata-k3-pro.jpg"
              alt="iDATA K3 Pro keypad mobile computer"
              width={440}
              height={375}
              className="aspect-[4/3]"
              fit="contain"
            />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
