import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Feature } from "@/data/company";
import { Icon, type IconName } from "./Icon";

type SectionProps = {
  children: ReactNode;
  tone?: "white" | "subtle" | "brand" | "inverse";
  id?: string;
  className?: string;
  labelledBy?: string;
};

const tones = {
  white: "bg-bg-page",
  subtle: "bg-bg-subtle",
  brand: "bg-bg-brand-subtle",
  inverse: "bg-bg-inverse text-text-inverse",
};

/** Page section with the standard 64px (mobile) / 96px (desktop) vertical rhythm. */
export function Section({ children, tone = "white", id, className = "", labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-16 lg:py-24 ${tones[tone]} ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

type SectionHeaderProps = {
  overline?: string;
  title: string;
  id?: string;
  text?: ReactNode;
  action?: ReactNode;
  inverse?: boolean;
  className?: string;
};

export function SectionHeader({ overline, title, id, text, action, inverse, className = "" }: SectionHeaderProps) {
  return (
    <div className={`mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between ${className}`}>
      <div className="max-w-[640px]">
        {overline && (
          <p className={`text-overline mb-3 ${inverse ? "text-text-inverse-muted" : "text-text-link"}`}>{overline}</p>
        )}
        <h2 id={id} className="text-h2">
          {title}
        </h2>
        {text && (
          <p className={`text-body-l mt-4 ${inverse ? "text-text-inverse-muted" : "text-text-secondary"}`}>{text}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "warning" }) {
  if (tone === "warning") {
    return (
      <span className="text-caption bg-bg-warning-subtle text-text-warning inline-flex items-center gap-1 rounded-sm px-2 py-1 font-medium">
        <Icon name="alert-triangle" size={14} />
        {children}
      </span>
    );
  }
  return (
    <span className="text-caption bg-bg-muted text-text-secondary inline-flex items-center rounded-sm px-2 py-1 font-medium">
      {children}
    </span>
  );
}

export function IconTile({ name, size = "md", inverse }: { name: IconName; size?: "md" | "lg"; inverse?: boolean }) {
  const box = size === "lg" ? "size-16" : "size-12";
  const colours = inverse ? "bg-bg-inverse-raised text-text-inverse" : "bg-bg-brand-subtle text-icon-accent";
  return (
    <span className={`${box} ${colours} inline-flex shrink-0 items-center justify-center rounded-md`}>
      <Icon name={name} size={size === "lg" ? 32 : 24} />
    </span>
  );
}

export function Checklist({ items, inverse, className = "" }: { items: string[]; inverse?: boolean; className?: string }) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="text-body-m flex gap-3">
          <Icon
            name="check-circle"
            size={24}
            className={`shrink-0 ${inverse ? "text-text-inverse-muted" : "text-text-success"}`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FeatureCard({ icon, title, text }: Feature) {
  return (
    <div className="border-border-default bg-bg-page flex h-full flex-col gap-4 rounded-lg border p-6">
      <IconTile name={icon} />
      <h3 className="text-h4">{title}</h3>
      <p className="text-body-m text-text-secondary">{text}</p>
    </div>
  );
}

export function FeatureGrid({ items, columns = 4 }: { items: Feature[]; columns?: 3 | 4 }) {
  return (
    <ul className={`grid gap-6 sm:grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {items.map((f) => (
        <li key={f.title}>
          <FeatureCard {...f} />
        </li>
      ))}
    </ul>
  );
}

/** A framed image. Set the aspect ratio with className. `fit="contain"` suits product photos on white. */
export function Frame({
  src,
  alt,
  width,
  height,
  fit = "cover",
  priority,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit?: "cover" | "contain";
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-bg-page border-border-default relative overflow-hidden rounded-lg border ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={`${className.includes("aspect-") ? "absolute inset-0 h-full" : "h-auto"} w-full ${
          fit === "contain" ? "object-contain p-6" : "object-cover"
        }`}
      />
    </div>
  );
}

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  breadcrumb: Crumb[];
  overline?: string;
  title: string;
  text: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  logo?: ReactNode;
};

export function PageHero({ breadcrumb, overline, title, text, actions, aside, logo }: PageHeroProps) {
  return (
    <section id="top" className="bg-hero-light scroll-mt-16 py-12 lg:scroll-mt-20 lg:py-20">
      <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="text-body-s text-text-muted flex flex-wrap items-center gap-1">
              {breadcrumb.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1">
                  {i > 0 && <Icon name="chevron-right" size={16} />}
                  {c.href ? (
                    <Link href={c.href} className="focus-ring hover:text-text-link rounded-sm underline-offset-4 hover:underline">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-text-primary font-medium">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {logo}
          {overline && <p className="text-overline text-text-link mb-3">{overline}</p>}
          <h1 className="text-h1 text-text-brand max-w-[760px]">{title}</h1>
          <p className="text-body-l text-text-secondary mt-5 max-w-[640px]">{text}</p>
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
}

export function EmptyState({
  icon,
  title,
  text,
  action,
  badge,
}: {
  icon: IconName;
  title: string;
  text: string;
  action?: ReactNode;
  badge?: ReactNode;
}) {
  return (
    <div className="border-border-strong bg-bg-page flex flex-col items-center gap-4 rounded-lg border border-dashed px-6 py-12 text-center">
      <IconTile name={icon} size="lg" />
      <h3 className="text-h4">{title}</h3>
      <p className="text-body-m text-text-secondary max-w-[520px]">{text}</p>
      {action}
      {badge}
    </div>
  );
}
