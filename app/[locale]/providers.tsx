"use client";

import { ThemeProvider } from "next-themes";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/client";
import { ReactNode } from "react";

export function Providers({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  if (i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </ThemeProvider>
  );
}
