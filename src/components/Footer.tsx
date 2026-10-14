import Link from "next/link";
import { categories } from "@/data/products";
import { site } from "@/data/site";
import { Icon, type IconName } from "./Icon";
import { Logo } from "./Logo";

const linkClass =
  "focus-ring text-body-m text-text-inverse-muted hover:text-text-inverse rounded-sm underline-offset-4 hover:underline";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-overline text-text-inverse mb-4">{title}</h2>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function ContactRow({ icon, children }: { icon: IconName; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <Icon name={icon} size={20} className="text-text-inverse-muted mt-0.5 shrink-0" />
      <div className="flex flex-col gap-1">{children}</div>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="bg-bg-inverse text-text-inverse border-t border-white/10">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo inverse />
          <p className="text-body-s text-text-inverse-muted mt-4 max-w-[320px]">{site.tagline}</p>
          <p className="text-overline text-text-inverse mt-8 mb-3">Follow us</p>
          <ul className="flex gap-3">
            {site.social.map((s) => (
              <li key={s.network}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`C&V Dynamics on ${s.network} (opens in new tab)`}
                  className="focus-ring hover:bg-action-inverse hover:text-text-brand inline-flex size-11 items-center justify-center rounded-full border border-text-inverse transition-colors"
                >
                  <Icon name={s.icon} size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <Column title="Products">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/products#${c.id}`} className={linkClass}>
                  {c.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/rentals" className={linkClass}>
                Rentals
              </Link>
            </li>
          </Column>
        </div>

        <div className="lg:col-span-2">
          <Column title="Company">
            <li>
              <Link href="/about" className={linkClass}>
                About us
              </Link>
            </li>
            <li>
              <Link href="/software/v-dyna-wms" className={linkClass}>
                V-Dyna WMS
              </Link>
            </li>
            <li>
              <Link href="/software/c-dyna-pos" className={linkClass}>
                C-Dyna POS
              </Link>
            </li>
            <li>
              {site.sister.href ? (
                <a href={site.sister.href} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1`}>
                  {site.sister.label}
                  <Icon name="external-link" size={14} />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              ) : (
                <span className="text-body-m text-text-inverse-muted">{site.sister.label}</span>
              )}
            </li>
            <li>
              <Link href="/contact" className={linkClass}>
                Contact
              </Link>
            </li>
          </Column>
        </div>

        <div className="sm:col-span-2 lg:col-span-4">
          <Column title="Contact">
            <ContactRow icon="phone">
              {site.phones.map((p) => (
                <a key={p.href} href={p.href} className={linkClass}>
                  {p.label}
                </a>
              ))}
            </ContactRow>
            <ContactRow icon="mail">
              {site.emails.map((e) => (
                <a key={e.href} href={e.href} className={`${linkClass} break-all`}>
                  {e.label}
                </a>
              ))}
            </ContactRow>
            <ContactRow icon="map-pin">
              <address className="text-body-m text-text-inverse-muted not-italic">{site.address}</address>
            </ContactRow>
          </Column>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-page text-caption text-text-inverse-muted flex flex-col gap-2 py-6 sm:flex-row sm:justify-between">
          <p>© {site.copyrightYear} {site.name} All rights reserved.</p>
          <p>{site.domainLabel}</p>
        </div>
      </div>
    </footer>
  );
}
