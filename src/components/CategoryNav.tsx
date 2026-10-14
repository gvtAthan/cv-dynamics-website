"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./Icon";

type Tab = { id: string; label: string; icon: IconName };

const ALL = "all";

/**
 * Sticky category bar for the Products page. Tabs jump to their section (smooth scroll comes from
 * the html scroll-behavior), and the active tab follows the section in view.
 */
export function CategoryNav({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(ALL);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = tabs
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => el !== null);

    const update = () => {
      // The section whose top has passed the line just under the sticky bars is the current one.
      const line = (bar.current?.getBoundingClientRect().bottom ?? 0) + 24;
      let current = ALL;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [tabs]);

  // Keep the active tab visible when the bar scrolls sideways on mobile.
  useEffect(() => {
    const list = bar.current?.querySelector<HTMLElement>("[data-tabs]");
    const tab = list?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!list || !tab) return;
    const left = tab.offsetLeft - 20;
    const right = tab.offsetLeft + tab.offsetWidth + 20 - list.clientWidth;
    if (list.scrollLeft > left) list.scrollTo({ left, behavior: "smooth" });
    else if (list.scrollLeft < right) list.scrollTo({ left: right, behavior: "smooth" });
  }, [active]);

  const all: Tab = { id: ALL, label: "All products", icon: "layout-grid" };

  return (
    <div ref={bar} className="border-border-default bg-bg-page sticky top-16 z-30 border-b lg:top-20">
      <nav aria-label="Product categories" className="container-page !px-0 lg:!px-20">
        <ul data-tabs className="flex gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] lg:px-0">
          {[all, ...tabs].map((t) => {
            const isActive = t.id === active;
            return (
              <li key={t.id} className="shrink-0">
                <a
                  href={t.id === ALL ? "#top" : `#${t.id}`}
                  data-tab={t.id}
                  aria-current={isActive ? "location" : undefined}
                  className={`focus-ring text-body-s inline-flex h-11 items-center gap-2 rounded-full border px-4 font-semibold transition-colors ${
                    isActive
                      ? "border-action-primary bg-action-primary text-text-inverse"
                      : "border-border-default text-text-secondary hover:border-border-brand hover:text-text-brand"
                  }`}
                >
                  <Icon name={t.icon} size={18} />
                  {t.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
