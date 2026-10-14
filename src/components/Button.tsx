import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "inverse" | "inverse-secondary";

const base =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-md text-body-m font-semibold whitespace-nowrap transition-colors disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary:
    "h-12 px-6 bg-action-primary text-text-inverse hover:bg-action-primary-hover active:bg-action-primary-active disabled:bg-action-disabled disabled:text-text-disabled",
  secondary:
    "h-12 px-6 border border-border-brand bg-bg-page text-text-brand hover:bg-action-secondary-hover active:bg-action-secondary-active",
  tertiary: "min-h-11 text-text-link hover:underline underline-offset-4",
  inverse:
    "h-12 px-6 bg-action-inverse text-text-brand hover:bg-action-inverse-hover active:bg-action-inverse-active",
  "inverse-secondary":
    "h-12 px-6 border border-text-inverse text-text-inverse hover:bg-white/10 active:bg-white/20",
};

export function buttonClass(variant: ButtonVariant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

type Common = {
  variant?: ButtonVariant;
  icon?: IconName;
  /** Trailing arrow, used on tertiary links. Defaults to true for tertiary. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

function Content({ icon, arrow, children }: Pick<Common, "icon" | "arrow" | "children">) {
  return (
    <>
      {icon && <Icon name={icon} size={20} />}
      <span>{children}</span>
      {arrow && <Icon name="arrow-right" size={20} />}
    </>
  );
}

type ButtonLinkProps = Common & { href: string; external?: boolean } & Omit<
    ComponentProps<"a">,
    "href" | "children" | "className"
  >;

/** A link styled as a button. tel:, mailto: and external links render a plain <a>. */
export function ButtonLink({
  href,
  variant = "primary",
  icon,
  arrow = variant === "tertiary",
  external,
  children,
  className,
  ...rest
}: ButtonLinkProps) {
  const cls = buttonClass(variant, className);
  const content = (
    <Content icon={icon} arrow={arrow}>
      {children}
    </Content>
  );
  if (external || /^(tel:|mailto:|https?:)/.test(href)) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

type ButtonProps = Common & { loading?: boolean } & Omit<ComponentProps<"button">, "children" | "className">;

export function Button({
  variant = "primary",
  icon,
  arrow,
  loading,
  children,
  className,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass(variant, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <>
          <Icon name="loader" size={20} className="animate-spin" />
          <span>{children}</span>
        </>
      ) : (
        <Content icon={icon} arrow={arrow}>
          {children}
        </Content>
      )}
    </button>
  );
}
