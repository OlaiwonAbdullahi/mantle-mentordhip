"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconArrowUpRight, IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "uk", src: "/uk.png", alt: "UK" },
  { code: "spain", src: "/spain.png", alt: "Spain" },
  { code: "portugal", src: "/portugal.png", alt: "Portugal" },
  { code: "france", src: "/france.webp", alt: "France" },
];

const Navbar = () => {
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  return (
    <div>
      <nav className="sticky top-0 z-50 p-5 bg-transparent nunito">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image src="/mantleLogo.png" alt="logo" width={75} height={75} />
          </div>
          <div className="hidden items-center gap-10 lg:flex">
            {["Home", "About Us", "Programs", "Contact Us"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-md  text-neutral-300 hover:text-neutral-100 transition-colors"
              >
                {item}
              </a>
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
              className="rounded-full  font-bold bg-[#008000] hover:bg-transparent hover:text-neutral-300 hover:border hover:border-[#008000] cursor-pointer p-3 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              <span>GET STARTED</span>
              <div className="p-1.5 rounded-full bg-white">
                <IconArrowUpRight color="#008000" />
              </div>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
