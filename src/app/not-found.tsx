import { ButtonLink } from "@/components/Button";
import { IconTile } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-page flex flex-col items-start gap-5">
        <IconTile name="search" size="lg" />
        <p className="text-overline text-text-link">Page not found</p>
        <h1 className="text-h1 text-text-brand">We can&apos;t find that page</h1>
        <p className="text-body-l text-text-secondary max-w-[560px]">
          The page may have moved. Try our products, or contact us and we will help you find what you need.
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/products">Browse products</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
