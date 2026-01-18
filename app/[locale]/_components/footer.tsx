"use client";
import { Button } from "@/components/ui/button";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconPhone,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconBrandTiktok,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <footer className="border-t border-neutral-200 dark:border-neutral-800 pt-16 pb-16 bg-neutral-50 dark:bg-black/20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 mb-16 lg:mb-24">
            <div className="w-full lg:w-1/3 space-y-8">
              <div className="flex items-center gap-3">
                <Image src="/logo.svg" alt="logo" width={200} height={200} />
              </div>
              <p className="text-muted-foreground font-medium leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <div className="flex gap-4">
                {[
                  {
                    icon: IconBrandInstagram,
                    href: " https://www.instagram.com/mantlementor/",
                  },
                  {
                    icon: IconBrandTiktok,
                    href: "https://www.tiktok.com/@mantle.mentor?_r=1&_t=ZG-92uQLDoTZRo",
                  },
                  {
                    icon: IconBrandYoutube,
                    href: "https://www.youtube.com/channel/UCYLfc869wMUGarMBQOBtqkg",
                  },
                  {
                    icon: IconBrandLinkedin,
                    href: "https://www.linkedin.com/company/mantle-mentorship-program",
                  },
                  { icon: IconPhone, href: "tel:+2348038979738" },
                ].map(({ icon: Icon, href }, i) => (
                  <Link href={href} key={i}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full border-neutral-300 dark:border-neutral-700 hover:bg-[#A020F0] hover:text-white hover:border-[#A020F0] transition-all bg-transparent text-muted-foreground"
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/3 space-y-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-foreground italic font-bold">
                Company
              </h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {[
                  { label: t("navbar.about_us"), href: "about-us" },
                  { label: t("navbar.contact_us"), href: "contact-us" },
                  { label: t("navbar.programs"), href: "programs" },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={`/${i18n.language}/${item.href}`}
                      className="hover:text-[#A020F0] transition-colors uppercase italic font-bold"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full lg:w-1/3 space-y-8">
              <h4 className="text-xs uppercase tracking-[0.2em] text-foreground italic font-bold">
                {t("footer.subscribe_title")}
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="email@address.com"
                  className="flex-1 rounded-full bg-white dark:bg-neutral-900/50 px-4 text-sm font-bold outline-none border border-neutral-200 dark:border-neutral-800 focus:border-[#A020F0]/50 text-foreground transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                />
                <Button className="rounded-full font-black italic uppercase px-6 bg-[#A020F0] hover:bg-[#7C1BB0] text-white">
                  Join
                </Button>
              </div>
              <Link href="https://mantle-mentorship-admin.vercel.app/">
                <Button className="bg-[#A020F0] hover:bg-[#7C1BB0]/80 cursor-pointer text-xs uppercase tracking-[0.2em] text-white italic font-bold">
                  Log in as Admin
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-12 gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} {t("footer.copyright")}
            </p>
            <div className="flex gap-12 italic">
              <a href="#" className="hover:text-[#A020F0] transition-colors">
                {t("footer.privacy_policy")}
              </a>
              <a href="#" className="hover:text-[#A020F0] transition-colors">
                {t("footer.terms_of_service")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
