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

const languages = [
  { code: "uk", src: "/uk.png", alt: "UK" },
  { code: "spain", src: "/spain.png", alt: "Spain" },
  { code: "portugal", src: "/portugal.png", alt: "Portugal" },
  { code: "france", src: "/france.webp", alt: "France" },
];

const Navbar = () => {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div>
      <nav className="sticky top-0 z-50 md:p-5 p-2 bg-transparent nunito">
        <div className="mx-auto flex max-w-7xl items-center justify-between md:px-6 px-2 md:py-4 py-2">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/mantleLogo.png" alt="logo" width={75} height={75} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 lg:flex">
            {["About Us", "Programs", "Contact Us"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-md  text-neutral-300 hover:text-neutral-100 transition-colors"
              >
                {item}
              </Link>
            ))}
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
                    onClick={() => setSelectedLang(lang)}
                    className="cursor-pointer text-neutral-300 focus:bg-neutral-800 focus:text-neutral-100"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={lang.src}
                        alt={lang.alt}
                        width={20}
                        height={20}
                        className="rounded-sm object-cover"
                      />
                      <span>{lang.alt}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="lg"
              className="hidden lg:flex rounded-full font-bold bg-[#008000] hover:bg-transparent hover:text-neutral-300 hover:border hover:border-[#008000] cursor-pointer p-3 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              <span>GET STARTED</span>
              <div className="p-1.5 rounded-full bg-white">
                <IconArrowUpRight color="#008000" />
              </div>
            </Button>

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
              <Image src="/mantleLogo.png" alt="logo" width={60} height={60} />
              <div className="cursor-pointer" onClick={toggleMobileMenu}>
                <IconX color="#ffffff" size={32} />
              </div>
            </div>

            <div className="flex flex-col gap-8 items-center text-center">
              {["About Us", "Programs", "Contact Us"].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-2xl font-bold text-neutral-300 hover:text-[#008000] transition-colors"
                  onClick={toggleMobileMenu}
                >
                  {item}
                </a>
              ))}

              <Button
                size="lg"
                className="w-full max-w-xs mt-4 rounded-full font-bold bg-[#008000] hover:bg-[#006400] text-white p-6 shadow-lg shadow-primary/20"
              >
                <span>GET STARTED</span>
                <div className="p-1.5 rounded-full bg-white ml-2">
                  <IconArrowUpRight color="#008000" size={16} />
                </div>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
