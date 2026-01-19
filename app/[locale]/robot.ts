import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://mantlementor.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/static/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/en/sitemap.xml`,
      `${baseUrl}/es/sitemap.xml`,
      `${baseUrl}/fr/sitemap.xml`,
      `${baseUrl}/nl/sitemap.xml`,
    ],
    host: baseUrl,
  };
}
