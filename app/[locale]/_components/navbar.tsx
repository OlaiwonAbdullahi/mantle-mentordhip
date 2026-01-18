"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  IconArrowUpRight,
  IconChevronDown,
  IconMenu,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";

const languages = [
  { code: "en", src: "/uk.png", alt: "English" },
  { code: "es", src: "/spain.png", alt: "Español" },
  { code: "fr", src: "/france.webp", alt: "Français" },
  { code: "nl", src: "/netherland.webp", alt: "Dutch" },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const selectedLang =
    languages.find((l) => l.code === i18n.language) || languages[0];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLanguageChange = (lang: (typeof languages)[0]) => {
    i18n.changeLanguage(lang.code);
    const newPathname = pathname.replace(`/${i18n.language}`, `/${lang.code}`);
    router.push(newPathname);
  };

  const currentLocale = i18n.language;

  const navItems = [
    { label: t("navbar.about_us"), href: `/${currentLocale}/about-us` },
    { label: t("navbar.programs"), href: `/${currentLocale}/programs` },
    { label: t("navbar.contact_us"), href: `/${currentLocale}/contact-us` },
  ];

  return (
    <div>
      <nav className="sticky top-0 z-50 md:p-5 p-2 bg-transparent  ">
        <div className="mx-auto flex max-w-7xl items-center justify-between md:px-6 px-2 md:py-4 py-2">
          <div className="flex items-center gap-3">
            <Link href={`/${currentLocale}`}>
              <Image src="/logo.svg" alt="logo" width={200} height={200} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-md transition-colors ${
                    isActive
                      ? "text-[#A020F0] font-semibold border-b-2 border-[#A020F0]"
                      : "text-neutral-500 hover:text-neutral-400"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 focus:outline-none">
                <Image
                  src={selectedLang.src}
                  alt={selectedLang.alt}
                  width={22}
                  height={22}
                  className="rounded-[2px] object-cover"
                />
                <IconChevronDown size={16} className="text-neutral-300" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-neutral-900 border-neutral-800"
              >
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang)}
                    className="cursor-pointer text-neutral-300   focus:bg-neutral-800 focus:text-neutral-100"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={lang.src}
                        alt={lang.alt}
                        width={20}
                        height={20}
                        className="rounded-[2px] object-contain h-5 w-5"
                      />
                      <span>{lang.alt}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href={`/${currentLocale}/programs`}>
              <Button
                size="lg"
                className="hidden lg:flex rounded-full font-bold bg-[#A020F0] hover:bg-transparent hover:text-neutral-300 hover:border hover:border-[#A020F0] cursor-pointer p-3 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
              >
                <span>{t("navbar.get_started")}</span>
                <div className="p-1.5 rounded-full bg-white">
                  <IconArrowUpRight color="#A020F0" />
                </div>
              </Button>
            </Link>

            {/* Mobile Menu Trigger */}
            <div
              className="lg:hidden cursor-pointer"
              onClick={toggleMobileMenu}
            >
              <IconMenu color="#ffffff" />
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 lg:hidden flex flex-col p-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <Image src="/logo.svg" alt="logo" width={60} height={60} />
              <div className="cursor-pointer" onClick={toggleMobileMenu}>
                <IconX color="#ffffff" size={32} />
              </div>
            </div>

            <div className="flex flex-col gap-8 items-center text-center">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-2xl font-bold transition-colors ${
                      isActive
                        ? "text-black border-b-2 border-black"
                        : "text-neutral-600 hover:text-black"
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href={`/${currentLocale}/programs`}
                onClick={toggleMobileMenu}
              >
                <Button
                  size="lg"
                  className="w-full max-w-xs mt-4 rounded-full font-bold bg-[#008000] hover:bg-[#006400] text-white p-6 shadow-lg shadow-primary/20"
                >
                  <span>{t("navbar.get_started")}</span>
                  <div className="p-1.5 rounded-full bg-white ml-2">
                    <IconArrowUpRight color="#008000" size={16} />
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
