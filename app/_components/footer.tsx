"use client";
import { Button } from "@/components/ui/button";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconPhone,
} from "@tabler/icons-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div>
      <footer className="border-t border-neutral-600 pt-16 pb-16 bg-black/20 nunito">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 mb-16 lg:mb-24">
            <div className="w-full lg:w-1/3 space-y-8">
              <div className="flex items-center gap-3">
                <Image
                  src="/mantleLogo.png"
                  alt="logo"
                  width={75}
                  height={75}
                />
                <span className="text-2xl text-neutral-300 sora tracking-tight font-bold">
                  The Mantle Mentorship Program
                </span>
              </div>
              <p className="text-neutral-400 font-medium leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <div className="flex gap-4">
                {[IconBrandInstagram, IconBrandFacebook, IconPhone].map(
                  (Icon, i) => (
                    <Button
                      key={i}
                      size="icon"
                      variant="outline"
                      className="rounded-full border-neutral-700 hover:bg-[#008000] hover:text-white hover:border-[#008000] transition-all bg-transparent text-neutral-400"
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  )
                )}
              </div>
            </div>

            <div className="w-full lg:w-1/3 space-y-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-neutral-200 italic font-bold">
                Company
              </h4>
              <ul className="space-y-4 text-sm text-neutral-400">
                {[
                  t("navbar.about_us"),
                  t("navbar.contact_us"),
                  t("navbar.programs"),
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="hover:text-[#008000] transition-colors uppercase italic font-bold"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full lg:w-1/3 space-y-8">
              <h4 className="text-xs uppercase tracking-[0.2em] text-neutral-200 italic font-bold">
                {t("footer.subscribe_title")}
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="email@address.com"
                  className="flex-1 rounded-full bg-neutral-900/50 px-4 text-sm font-bold outline-none border border-neutral-800 focus:border-[#008000]/50 text-neutral-300 transition-all placeholder:text-neutral-600"
                />
                <Button className="rounded-full font-black italic uppercase px-6 bg-[#008000] hover:bg-[#006400] text-white">
                  Join
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between border-t border-neutral-800 pt-12 gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} {t("footer.copyright")}
            </p>
            <div className="flex gap-12 italic">
              <a href="#" className="hover:text-[#008000] transition-colors">
                {t("footer.privacy_policy")}
              </a>
              <a href="#" className="hover:text-[#008000] transition-colors">
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
