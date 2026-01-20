import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import Script from "next/script";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mantlementor.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "The Mantle Mentorship";

export const metadata: Metadata = {
  title: {
    default: "The Mantle Mentorship",
    template: "%s | The Mantle Mentorship",
  },
  description:
    "Transferring the practical & life-based skill mantle to next future leaders",
  keywords: [
    "mentorship",
    "leadership",
    "practical skills",
    "life skills",
    "future leaders",
    "personal development",
  ],
  authors: [
    {
      name: "The Mantle Mentorship Team",
      url: baseUrl,
    },
  ],
  creator: "The Mantle Mentorship",
  publisher: "The Mantle Mentorship",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: siteName,
    title: "The Mantle Mentorship",
    description:
      "Transferring the practical & life-based skill mantle to next future leaders",
    images: [
      {
        url: `${baseUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: "The Mantle Mentorship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Mantle Mentorship",
    description:
      "Transferring the practical & life-based skill mantle to next future leaders",
    images: [`${baseUrl}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "WnEKKpiLBsjJOSNna0xOWk8KJ6EhKPm-urg2eQ9gAxc",
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      en: `${baseUrl}/en`,
      es: `${baseUrl}/es`,
      fr: `${baseUrl}/fr`,
      nl: `${baseUrl}/nl`,
      "x-default": baseUrl,
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: baseUrl,
    description:
      "Transferring the practical & life-based skill mantle to next future leaders",
    sameAs: [
      "https://www.instagram.com/mantlementor/",
      "https://www.youtube.com/channel/UCYLfc869wMUGarMBQOBtqkg",
      "https://www.linkedin.com/company/mantle-mentorship-program/",
      "https://www.tiktok.com/@mantle.mentor?_r=1&_t=ZG-92uQLDoTZRo",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",

      email: "info@mantlementor.com",
      telephone: "+234 803 897 9738",
    },
    image: `${baseUrl}/logo.png`,
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SJWBWS8XRP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ''G-SJWBWS8XRP', {
              'page_path': window.location.pathname,
            });
          `}
        </Script>
        <meta
          name="google-site-verification"
          content="WnEKKpiLBsjJOSNna0xOWk8KJ6EhKPm-urg2eQ9gAxc"
        />
      </head>
      <body className="antialiased ">
        <Providers locale={locale}>
          <div className="min-h-screen relative ">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            <Toaster position="top-right" richColors duration={5000} />
            <Navbar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
