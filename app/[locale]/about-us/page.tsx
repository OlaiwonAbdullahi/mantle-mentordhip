"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  IconBook,
  IconGlobe,
  IconUsers,
  IconBulb,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  const benefits = [
    {
      icon: IconUsers,
      text: t("about_us_page.benefit_1"),
    },
    {
      icon: IconBulb,
      text: t("about_us_page.benefit_2"),
    },
    {
      icon: IconGlobe,
      text: t("about_us_page.benefit_3"),
    },
    {
      icon: IconUsers,
      text: t("about_us_page.benefit_4"),
    },
    {
      icon: IconBook,
      text: t("about_us_page.benefit_5"),
    },
    {
      icon: IconUsers,
      text: t("about_us_page.benefit_6"),
    },
    {
      icon: IconCurrencyDollar,
      text: t("about_us_page.benefit_7"),
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12  ">
      <div className="mx-auto max-w-7xl px-6 space-y-24">
        {/* Header & Why Section */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl  ">
            {t("about_us_page.title_about")}{" "}
            <span className="text-[#A020F0]">
              {t("about_us_page.title_us")}
            </span>
          </h1>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white  ">
              {t("about_us_page.why_title")}
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              {t("about_us_page.why_text")}
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white  ">
              {t("about_us_page.benefits_title")}{" "}
              <span className="text-[#A020F0]">
                {t("about_us_page.benefits_subtitle")}
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-neutral-900/50 border-neutral-800 hover:border-[#A020F0]/50 transition-all duration-300 group"
              >
                <CardContent className="p-6 flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-[#A020F0]/10 text-[#A020F0] group-hover:bg-[ #A020F0] group-hover:text-white transition-colors">
                    <benefit.icon size={24} />
                  </div>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {benefit.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Chief Mentor Section */}
        <div className="bg-neutral-900/30 rounded-3xl p-8 lg:p-12 border border-white/5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden bg-neutral-800">
              {/* Placeholder for Ebuka Umeh's Image */}
              <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
                <span className="sr-only">Ebuka Umeh Image</span>
                <div className="absolute inset-0 bg-linear-to-tr from-[#A020F0]/20 to-neutral-800" />
                <Image
                  src="/ebuka.png"
                  alt="Ebuka Umeh"
                  fill
                  className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-white  ">
                  {t("about_us_page.chief_mentor_name")}
                </h2>
                <p className="text-[#A020F0] font-medium text-lg uppercase tracking-wider mt-2">
                  {t("about_us_page.chief_mentor_role")}
                </p>
              </div>

              <div className="space-y-4 text-neutral-400 leading-relaxed text-base lg:text-md">
                <p>{t("about_us_page.chief_mentor_bio_1")}</p>
                <p>{t("about_us_page.chief_mentor_bio_2")}</p>
                <p>{t("about_us_page.chief_mentor_bio_3")}</p>
                <p>{t("about_us_page.chief_mentor_bio_4")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
