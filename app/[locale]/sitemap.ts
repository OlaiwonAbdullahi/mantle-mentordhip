import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://mantlementor.com";
  const locales = ["en", "es", "fr", "nl"];
  const routes = ["", "/about-us", "/programs", "/contact-us", "/register"];

  // Generate sitemap entries for all locales and routes
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            es: `${baseUrl}/es${route}`,
            fr: `${baseUrl}/fr${route}`,
            nl: `${baseUrl}/nl${route}`,
            "x-default": `${baseUrl}${route}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
