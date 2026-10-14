import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const routes = ["", "/about", "/products", "/software", "/software/v-dyna-wms", "/software/c-dyna-pos", "/rentals", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
