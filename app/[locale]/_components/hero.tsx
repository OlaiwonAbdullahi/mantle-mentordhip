"use client";
import { Button } from "@/components/ui/button";
import { IconArrowUpRight, IconPointFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] py-16 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center gap-10">
        {/* Badge */}
        <div className="animate-fade-in-up">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-1.5 px-4 flex items-center gap-3 text-sm font-medium text-neutral-300 nunito shadow-xl shadow-[#008000]/5">
            <span>{t("hero.virtual")}</span>
            <IconPointFilled size={10} className="text-[#008000]" />
            <span>{t("hero.cohorts_yr")}</span>
            <IconPointFilled size={10} className="text-[#008000]" />
            <span>{t("hero.global")}</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center max-w-4xl space-y-6 animate-fade-in-up delay-100">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold sora tracking-tight text-white leading-[1.1]">
            {t("hero.title_part1")}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-neutral-200 via-white to-neutral-400">
              {t("hero.title_part2")}
            </span>{" "}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#008000] to-[#00a000]">
              {t("hero.title_part3")}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 nunito max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row nunito items-center gap-4 animate-fade-in-up delay-200 w-full justify-center">
          <Link href={`/${i18n.language}/about-us`}>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-[#008000] cursor-pointer text-[#008000] hover:bg-[#008000] hover:text-white px-8 h-12 text-base font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,128,0,0.3)] bg-transparent w-full sm:w-auto"
            >
              <span>{t("hero.learn_more")}</span>
            </Button>
          </Link>
          <Link href={`/${i18n.language}/programs`}>
            <Button
              size="lg"
              className="rounded-full bg-[#008000] cursor-pointer hover:bg-[#006400] text-white px-8 h-12 text-base font-bold transition-all duration-300 shadow-lg shadow-[#008000]/25 hover:shadow-[#008000]/40 hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <span>{t("hero.apply_now")}</span>
              <div className="bg-white/20 rounded-full p-1 ml-2">
                <IconArrowUpRight size={16} />
              </div>
            </Button>
          </Link>
        </div>

        {/* Image Showcase */}
        <div className="relative mt-12 group animate-fade-in-up delay-300 perspective-1000">
          {/* Glow effect behind image */}
          <div className="absolute -inset-1 bg-linear-to-r from-[#008000]/20 to-neutral-800/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 shadow-2xl transition-transform duration-700 hover:rotate-1 hover:scale-[1.01]">
            <div className="rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent z-10 pointer-events-none" />
              <Image
                src="/hero.jpeg"
                alt="Mantle Mentorship Session"
                width={800}
                height={450}
                className="w-full h-auto object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
