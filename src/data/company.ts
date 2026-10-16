import type { IconName } from "./icons";

export type Feature = { icon: IconName; title: string; text: string };

export const advantages: Feature[] = [
  {
    icon: "flexible",
    title: "Flexible solutions",
    text: "We adapt to each client, from small-volume orders to large-scale distribution.",
  },
  {
    icon: "network",
    title: "Reliable network",
    text: "Strong supplier partnerships keep products consistently available.",
  },
  {
    icon: "tag",
    title: "Competitive pricing",
    text: "Strategic sourcing lets us offer cost-effective solutions.",
  },
  {
    icon: "process",
    title: "Process improvement",
    text: "We help businesses enhance and automate supply chain processes.",
  },
];

export const coreValues = [
  {
    letter: "D",
    title: "Driven by excellence",
    text: "We deliver high-quality distribution services with professionalism, efficiency and continuous improvement.",
  },
  {
    letter: "Y",
    title: "Yielding results",
    text: "We focus on measurable outcomes that contribute to our clients' operational success and growth.",
  },
  {
    letter: "N",
    title: "Network-oriented",
    text: "We build strong partnerships with suppliers, clients and stakeholders for a reliable supply chain.",
  },
  {
    letter: "A",
    title: "Adaptability",
    text: "We stay flexible and responsive to changing market demands, technologies and client needs.",
  },
  {
    letter: "M",
    title: "Modern innovation",
    text: "We embrace automation and smart solutions to improve supply chain processes and performance.",
  },
  {
    letter: "I",
    title: "Integrity",
    text: "We do business with honesty, transparency and accountability in every transaction.",
  },
  {
    letter: "C",
    title: "Customer commitment",
    text: "We put client satisfaction first with tailored solutions and dependable service.",
  },
  {
    letter: "S",
    title: "Sustainability",
    text: "We build long-term value through responsible practices, efficiency and enduring partnerships.",
  },
];

export type SoftwareProduct = {
  name: string;
  href: string;
  logo: { src: string; width: number; height: number };
  text: string;
  points: string[];
  cta: string;
};

export const software: SoftwareProduct[] = [
  {
    name: "V-Dyna WMS",
    href: "/software/v-dyna-wms",
    logo: { src: "/images/logos/vdyna-wms-white.png", width: 621, height: 200 },
    text: "Streamline warehouse operations, improve inventory accuracy and manage the movement and storage of goods.",
    points: [
      "Better control and visibility of stock",
      "Efficient movement and storage of goods",
      "Advanced features at an affordable price",
    ],
    cta: "Explore V-Dyna WMS",
  },
  {
    name: "C-Dyna POS",
    href: "/software/c-dyna-pos",
    logo: { src: "/images/logos/cdyna-pos-white.png", width: 584, height: 200 },
    text: "Order and inventory management system. Beyond the ordinary POS.",
    points: [
      "Centralized dashboard",
      "Real-time, offline-first sync",
      "Inventory management built in",
    ],
    cta: "Explore C-Dyna POS",
  },
];

/** Devices available for rent. Image names refer to /public/images/products. */
export const rentalDevices = [
  { image: "idata-k3-pro", name: "iDATA K3 Pro", description: "Keypad mobile computer" },
  { image: "idata-t1-pro", name: "iDATA T1 Pro", description: "Full-touch mobile computer" },
];

export const inquiryTypes = [
  { value: "quote", label: "Request a quote" },
  { value: "rental", label: "Rental" },
  { value: "demo", label: "Software demo" },
  { value: "support", label: "Support" },
  { value: "other", label: "Something else" },
] as const;
