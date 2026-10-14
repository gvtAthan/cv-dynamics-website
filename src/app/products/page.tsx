import type { Metadata } from "next";
import { ProductCard } from "@/components/cards";
import { CategoryNav } from "@/components/CategoryNav";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { Badge, IconTile, PageHero } from "@/components/ui";
import { categories, countModels, modelsLabel } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "PDA scanners, printers, warehouse equipment and supermarket equipment from C&V Dynamics, all on one page.",
};

const tabs = categories.map(({ id, title, icon }) => ({ id, label: title, icon }));

export default function ProductsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Products" }]}
        overline="Products"
        title="Products for every part of your supply chain"
        text="Every product line in one place. Choose a category to jump straight to it."
      />

      <CategoryNav tabs={tabs} />

      {categories.map((category, i) => (
        <section
          key={category.id}
          id={category.id}
          aria-labelledby={`${category.id}-title`}
          className={`scroll-mt-[136px] py-16 lg:scroll-mt-[152px] lg:py-24 ${i % 2 ? "bg-bg-subtle" : "bg-bg-page"}`}
        >
          <div className="container-page">
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-start lg:mb-12">
              <IconTile name={category.icon} size="lg" />
              <div className="max-w-[640px]">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 id={`${category.id}-title`} className="text-h2">
                    {category.title}
                  </h2>
                  <Badge>{modelsLabel(countModels(category))}</Badge>
                </div>
                <p className="text-body-l text-text-secondary mt-3">{category.description}</p>
              </div>
            </div>

            <div className="flex flex-col gap-12 lg:gap-16">
              {category.groups.map((group) => (
                <div key={group.title}>
                  <div className="mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-h3">{group.title}</h3>
                      <Badge>{modelsLabel(group.products.length)}</Badge>
                    </div>
                    <p className="text-body-m text-text-secondary mt-2">{group.description}</p>
                  </div>
                  <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                    {group.products.map((product) => (
                      <li key={product.name}>
                        <ProductCard product={product} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <a
              href="#top"
              className="focus-ring text-body-m text-text-link mt-10 inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold underline-offset-4 hover:underline"
            >
              <Icon name="arrow-up" size={20} />
              Back to top
            </a>
          </div>
        </section>
      ))}

      <CtaBand
        overline="Need help choosing?"
        title="Tell us what you need"
        text="Send us the models or specifications you are after and we will get back to you with availability and pricing."
      />
    </>
  );
}
