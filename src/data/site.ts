import type { IconName } from "./icons";

export const site = {
  name: "C&V Dynamics Inc.",
  shortName: "C&V Dynamics",
  // Open question for C&V: cvdynamics.com.ph or cvdynamicsinc.com.ph.
  url: "https://www.cvdynamics.com.ph",
  domainLabel: "www.cvdynamics.com.ph",
  copyrightYear: 2026,
  tagline:
    "Engineered to deliver. Product distribution, wholesale and retail trading for supply chains across the Philippines.",
  phones: [
    { label: "(049) 550 4404", href: "tel:+63495504404" },
    { label: "0916 215 6111", href: "tel:+639162156111" },
    { label: "0917 168 3207", href: "tel:+639171683207" },
  ],
  emails: [
    { label: "sales@cvdynamics.com.ph", href: "mailto:sales@cvdynamics.com.ph" },
    { label: "support@cvdynamics.com.ph", href: "mailto:support@cvdynamics.com.ph" },
  ],
  address:
    "4th Floor, W.S.A Commercial Building, Villa Esmeralda Subdivision, BLK24 LOT28, RSBS Blvd, Brgy. Balibago, Santa Rosa City, Laguna, Philippines",
  addressShort: "4F W.S.A Commercial Bldg., RSBS Blvd, Brgy. Balibago, Santa Rosa City, Laguna",
  // Content needed from C&V.
  businessHours: null as string | null,
  // Placeholders until C&V confirms its official pages.
  social: [
    {
      network: "Facebook",
      icon: "facebook" as IconName,
      href: "https://www.facebook.com/PLACEHOLDER-CV-FACEBOOK-PAGE",
    },
    {
      network: "LinkedIn",
      icon: "linkedin" as IconName,
      href: "https://www.linkedin.com/company/PLACEHOLDER-CV-LINKEDIN-PAGE",
    },
  ],
  // Sister company link shown in the footer. URL needed from C&V.
  sister: { label: "GVT Enterprises Inc.", href: null as string | null },
};

export const primaryPhone = site.phones[0];

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string; icon: IconName }[];
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "PDA scanners",
        href: "/products#pda-scanners",
        description: "Handhelds, barcode, ring and RFID scanners",
        icon: "scan",
      },
      {
        label: "Printers",
        href: "/products#printers",
        description: "Label, ink-tank and LED colour printers",
        icon: "printer",
      },
      {
        label: "Warehouse equipment",
        href: "/products#warehouse-equipment",
        description: "Racking, pallets, forklifts, generators",
        icon: "warehouse",
      },
      {
        label: "Supermarket equipment",
        href: "/products#supermarket-equipment",
        description: "Trolleys, carts, racks and counters",
        icon: "cart",
      },
    ],
  },
  {
    label: "Software",
    href: "/software",
    children: [
      {
        label: "V-Dyna WMS",
        href: "/software/v-dyna-wms",
        description: "Warehouse management system",
        icon: "warehouse",
      },
      {
        label: "C-Dyna POS",
        href: "/software/c-dyna-pos",
        description: "Order and inventory management for stores",
        icon: "dashboard",
      },
    ],
  },
  { label: "Rentals", href: "/rentals" },
];
