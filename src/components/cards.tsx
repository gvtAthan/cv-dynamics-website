import Image from "next/image";
import Link from "next/link";
import type { SoftwareProduct } from "@/data/company";
import type { Product, ProductCategory } from "@/data/products";
import { ButtonLink } from "./Button";
import { Icon } from "./Icon";
import { Checklist } from "./ui";

const productImage = (name: string) => `/images/products/${name}.jpg`;

/** Category card for the Home page: 4:3 image, title, line and a link into the Products page. */
export function CategoryCard({ category }: { category: ProductCategory }) {
  return (
    <Link
      href={`/products#${category.id}`}
      className="group focus-ring border-border-default bg-bg-page hover:border-border-brand flex h-full flex-col overflow-hidden rounded-lg border transition-[border-color,box-shadow] hover:shadow-md"
    >
      <div className="bg-bg-page border-border-default aspect-[4/3] border-b">
        <Image
          src={productImage(category.coverImage)}
          alt=""
          width={480}
          height={360}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-contain p-6"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-h4 flex items-center gap-2">
          <Icon name={category.icon} size={20} className="text-icon-accent" />
          {category.title}
        </h3>
        <p className="text-body-m text-text-secondary flex-1">{category.summary}</p>
        <span className="text-body-m text-text-link mt-2 inline-flex items-center gap-2 font-semibold group-hover:underline">
          View products <Icon name="arrow-right" size={20} />
        </span>
      </div>
    </Link>
  );
}

/** Product card: 1:1 image, model, one line and an Inquire now link pinned to the bottom. */
export function ProductCard({
  product,
  cta = "Inquire now",
  href,
  headingLevel = 4,
}: {
  product: Product;
  cta?: string;
  href?: string;
  headingLevel?: 3 | 4;
}) {
  const Heading = headingLevel === 3 ? "h3" : "h4";
  const link = href ?? `/contact?type=quote&product=${encodeURIComponent(product.name)}`;
  return (
    <article className="border-border-default bg-bg-page flex h-full flex-col overflow-hidden rounded-lg border">
      <div className="border-border-default aspect-square border-b">
        <Image
          src={productImage(product.image)}
          alt={product.name}
          width={400}
          height={400}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="h-full w-full object-contain p-4"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4 lg:p-5">
        <Heading className="text-body-m lg:text-body-l font-semibold">{product.name}</Heading>
        <p className="text-body-s text-text-muted flex-1">{product.description}</p>
        <Link
          href={link}
          className="focus-ring text-body-s text-text-link mt-3 inline-flex min-h-11 items-center gap-1 self-start rounded-sm font-semibold underline-offset-4 hover:underline lg:text-body-m"
        >
          {cta}
          <span className="sr-only"> about {product.name}</span>
          <Icon name="arrow-right" size={18} />
        </Link>
      </div>
    </article>
  );
}

export function SoftwareCard({ item }: { item: SoftwareProduct }) {
  return (
    <article className="border-border-default bg-bg-page flex h-full flex-col overflow-hidden rounded-lg border">
      <div className="bg-bg-inverse flex h-40 items-center justify-center px-8 lg:h-48">
        <Image
          src={item.logo.src}
          alt=""
          width={item.logo.width}
          height={item.logo.height}
          className="h-16 w-auto lg:h-20"
        />
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6 lg:p-8">
        <h3 className="text-h3 sr-only">{item.name}</h3>
        <p className="text-body-l text-text-secondary">{item.text}</p>
        <Checklist items={item.points} className="flex-1" />
        <ButtonLink href={item.href} variant="secondary" className="self-start" arrow>
          {item.cta}
        </ButtonLink>
      </div>
    </article>
  );
}
