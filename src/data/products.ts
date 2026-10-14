import type { IconName } from "./icons";

export type Product = {
  name: string;
  description: string;
  /** Path under /public/images/products, without extension. */
  image: string;
};

export type ProductGroup = {
  title: string;
  description: string;
  products: Product[];
};

export type ProductCategory = {
  id: string;
  title: string;
  icon: IconName;
  /** Short line used on the Home page cards. */
  summary: string;
  /** Line under the category heading on the Products page. */
  description: string;
  /** Image for the Home page category card. */
  coverImage: string;
  groups: ProductGroup[];
};

const p = (image: string, name: string, description: string): Product => ({
  image,
  name,
  description,
});

export const categories: ProductCategory[] = [
  {
    id: "pda-scanners",
    title: "PDA scanners",
    icon: "scan",
    summary: "Rugged handhelds, barcode, ring and RFID scanners for inventory and retail.",
    description:
      "Rugged iDATA handhelds, barcode and ring scanners, RFID readers and tablets.",
    coverImage: "idata-t3-pro",
    groups: [
      {
        title: "Barcode scanners",
        description: "Wired and wireless handheld scanners.",
        products: [
          p("idata-j7", "iDATA J7", "Barcode scanner"),
          p("idata-j15", "iDATA J15", "Barcode scanner"),
          p("idata-j16", "iDATA J16", "Barcode scanner"),
        ],
      },
      {
        title: "Mobile computers: full-touch",
        description: "Android handhelds with full touchscreens.",
        products: [
          p("idata-t3-pro", "iDATA T3 Pro", "Full-touch mobile computer"),
          p("idata-t1-pro", "iDATA T1 Pro", "Full-touch mobile computer"),
          p("idata-t5", "iDATA T5", "Full-touch mobile computer"),
        ],
      },
      {
        title: "Mobile computers: keypad",
        description: "Handhelds with physical keypads for fast data entry.",
        products: [
          p("idata-k3-pro", "iDATA K3 Pro", "Keypad mobile computer"),
          p("idata-k8-pro", "iDATA K8 Pro", "Keypad mobile computer"),
        ],
      },
      {
        title: "RFID scanners",
        description: "Mobile and fixed RFID readers.",
        products: [
          p("idata-t1-uhf", "iDATA T1 UHF", "Mobile RFID scanner"),
          p("idata-r400", "iDATA R400", "Fixed RFID reader"),
          p("idata-q3000", "iDATA Q3000", "RFID scanner"),
        ],
      },
      {
        title: "Ring scanner",
        description: "Ultra-compact, worn on the finger for hands-free scanning.",
        products: [p("idata-rs200", "iDATA RS200", "Ultra-compact ring scanner")],
      },
      {
        title: "Tablet scanners",
        description: "Rugged tablets with built-in scanning.",
        products: [
          p("idata-p1", "iDATA P1", "Tablet scanner"),
          p("idata-p1-mini", "iDATA P1 Mini", "Tablet scanner"),
        ],
      },
    ],
  },
  {
    id: "printers",
    title: "Printers",
    icon: "printer",
    summary: "Brother label, ink-tank and LED colour printers for shelves, shipping and office.",
    description:
      "Brother label, ink-tank and LED colour printers for shelves, shipping and the office.",
    coverImage: "brother-ql-800",
    groups: [
      {
        title: "Label printers",
        description: "Brother label printers for shelves, products and shipping.",
        products: [
          p("brother-pt-p900w", "Brother PT-P900W", "Wireless label printer"),
          p("brother-ql-800", "Brother QL-800", "Label printer"),
        ],
      },
      {
        title: "Colour ink-tank printers",
        description: "Brother DCP and MFC ink-tank printers for the office.",
        products: [
          p("brother-dcp-t530dw", "Brother DCP-T530DW", "Wireless ink-tank printer"),
          p("brother-mfc-t930dw", "Brother MFC-T930DW", "Wireless ink-tank all-in-one"),
        ],
      },
      {
        title: "LED colour printers",
        description: "Brother DCL series LED printers for high-volume colour.",
        products: [
          p("brother-hl-l3280cdw", "Brother HL-L3280CDW", "Wireless LED colour printer"),
          p("brother-mfc-l8340cdw", "Brother MFC-L8340CDW", "Wireless LED colour all-in-one"),
        ],
      },
    ],
  },
  {
    id: "warehouse-equipment",
    title: "Warehouse equipment",
    icon: "warehouse",
    summary: "Racking, metal pallets, ladders, trolleys, forklifts and generator sets.",
    description:
      "Racking, metal pallets, ladders and trolleys, forklifts and generator sets.",
    coverImage: "racking-system",
    groups: [
      {
        title: "Storage and handling",
        description: "Racking, pallets, ladders and trolleys made to order.",
        products: [
          p("racking-system", "Racking system", "Cantilever-style racking"),
          p("metal-pallet-a", "Metal pallet, type A", "1200 × 1000 mm, two-way entry"),
          p("metal-pallet-b", "Metal pallet, type B", "1800 × 1200 mm, galvanized"),
          p("mobile-ladder", "Mobile ladder", "4.57 m platform, 6-step option"),
          p("mobile-trolley", "Mobile trolley", "300 kg and 150 kg capacity"),
        ],
      },
      {
        title: "Forklifts",
        description: "Diesel and electric forklifts from DEVELON and HI-RO.",
        products: [
          p("forklift-develon", "DEVELON forklift", "Diesel or electric, 1.5–10 tons"),
          p("forklift-hiro", "HI-RO forklift", "Diesel or electric, 1.5–10 tons"),
        ],
      },
      {
        title: "Generator sets",
        description: "Standby and prime power for houses, factories and construction sites.",
        products: [
          p("generator-everdigm", "EVERDIGM generator set", "Open and closed, 20–650 kVA"),
          p("generator-hiro", "HI-RO generator set", "Cummins engine, up to 2.5 MW"),
        ],
      },
    ],
  },
  {
    id: "supermarket-equipment",
    title: "Supermarket equipment",
    icon: "cart",
    summary: "Trolleys, shopping carts, display racks and checkout counters.",
    description: "Trolleys, carts, display racks and checkout counters for retail stores.",
    coverImage: "supermarket-trolleys",
    groups: [
      {
        title: "Trolleys and carts",
        description: "Basket trolleys and wire shopping carts for stores of any size.",
        products: [
          p("supermarket-trolleys", "Supermarket trolleys", "Basket trolleys and carts"),
          p("basket-trolley", "Basket trolley", "For supermarkets and groceries"),
          p("shopping-cart", "Wire shopping cart", "For supermarkets and groceries"),
        ],
      },
      {
        title: "Store fixtures",
        description: "Shelving and counters for the shop floor.",
        products: [
          p("display-rack", "Display rack", "Gondola shelving"),
          p("checkout-counter", "Checkout counter", "Cashier counter"),
        ],
      },
    ],
  },
];

export const countModels = (c: ProductCategory) =>
  c.groups.reduce((n, g) => n + g.products.length, 0);

export const modelsLabel = (n: number) => `${n} ${n === 1 ? "model" : "models"}`;

export const allProductNames = categories.flatMap((c) =>
  c.groups.flatMap((g) => g.products.map((x) => x.name)),
);
