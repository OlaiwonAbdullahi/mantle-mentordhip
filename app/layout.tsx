import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Mantle Mentorship",
  description:
    "Transferring the practical & life-based skill mantle to next future leaders",
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
