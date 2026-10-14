"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { nav, primaryPhone, type NavItem } from "@/data/site";
import { ButtonLink } from "./Button";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

const navLinkClass = (active: boolean) =>
  `focus-ring relative inline-flex h-11 items-center gap-1 rounded-sm px-3 text-body-m font-medium transition-colors hover:text-text-brand ${
    active
      ? "text-text-brand after:absolute after:inset-x-3 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-border-brand"
      : "text-text-secondary"
  }`;

function Dropdown({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const wrapper = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  const items = () => Array.from(wrapper.current?.querySelectorAll<HTMLAnchorElement>("[data-menu-item]") ?? []);

  const focusItem = (index: number) => {
    const list = items();
    list[(index + list.length) % list.length]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const list = items();
    const current = list.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
      toggle.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusItem(current + 1));
    } else if (e.key === "ArrowUp" && open) {
      e.preventDefault();
      focusItem(current < 0 ? -1 : current - 1);
    }
  };

  return (
    <div
      ref={wrapper}
      className="relative flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={(e) => {
        // Keyboard focus opens the menu; a mouse click is handled by the toggle.
        if (e.target.matches(":focus-visible")) setOpen(true);
      }}
      onBlur={(e) => {
        if (!wrapper.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={onKeyDown}
    >
      <Link href={item.href} className={`${navLinkClass(active)} pr-1`} aria-current={active ? "page" : undefined}>
        {item.label}
      </Link>
      <button
        ref={toggle}
        type="button"
        className="focus-ring text-text-secondary hover:text-text-brand inline-flex h-11 w-7 items-center justify-center rounded-sm"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${item.label} menu`}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="chevron-down" size={18} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div id={menuId} hidden={!open} className="absolute top-full left-0 z-50 pt-3">
        <ul className="border-border-default bg-bg-page shadow-md w-[360px] rounded-lg border p-2">
          {item.children!.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                data-menu-item
                onClick={() => setOpen(false)}
                className="focus-ring hover:bg-bg-subtle flex gap-3 rounded-md p-3"
              >
                <span className="bg-bg-brand-subtle text-icon-accent inline-flex size-10 shrink-0 items-center justify-center rounded-md">
                  <Icon name={child.icon} size={20} />
                </span>
                <span>
                  <span className="text-body-m text-text-primary block font-semibold">{child.label}</span>
                  <span className="text-body-s text-text-muted block">{child.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header className="border-border-default bg-bg-page sticky top-0 z-40 border-b">
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-20">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  {item.children ? (
                    <Dropdown item={item} active={active} />
                  ) : (
                    <Link href={item.href} className={navLinkClass(active)} aria-current={active ? "page" : undefined}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/contact?type=quote">Request a quote</ButtonLink>
        </div>

        <button
          ref={menuButton}
          type="button"
          className="focus-ring text-text-brand -mr-2 inline-flex size-11 items-center justify-center rounded-md lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={24} />
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="bg-bg-page fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex min-h-full flex-col gap-8 py-6">
          <ul className="flex flex-col">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-border-default border-b">
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`focus-ring text-h4 flex min-h-14 items-center justify-between rounded-sm ${
                      active ? "text-text-brand underline decoration-2 underline-offset-8" : "text-text-primary"
                    }`}
                  >
                    {item.label}
                    <Icon name="chevron-right" size={20} className="text-text-muted" />
                  </Link>
                  {item.children && (
                    <ul className="mb-3 flex flex-col">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={close}
                            className="focus-ring text-body-m text-text-secondary flex min-h-11 items-center gap-3 rounded-sm pl-1"
                          >
                            <Icon name={child.icon} size={20} className="text-icon-accent" />
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pb-4">
            <ButtonLink href="/contact?type=quote" onClick={close}>
              Request a quote
            </ButtonLink>
            <ButtonLink href={primaryPhone.href} variant="secondary" icon="phone">
              Call {primaryPhone.label}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
