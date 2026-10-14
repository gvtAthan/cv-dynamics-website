import type { Metadata, Viewport } from "next";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Engineered to deliver`,
    template: `%s | ${site.shortName}`,
  },
  description:
    "Scanners, printers, warehouse and supermarket equipment, plus V-Dyna WMS and C-Dyna POS software, for businesses across the Philippines.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_PH",
  },
};

export const viewport: Viewport = {
  themeColor: "#02136d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="focus-ring bg-action-primary text-text-inverse sr-only z-50 rounded-md px-4 py-3 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
