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

// SEO Metadata - will be handled by layout
export const metadata = {
  title: "About Us - Learn Our Mentorship Mission",
  description:
    "Discover The Mantle Mentorship's mission to transfer practical and life-based skills to the next generation of leaders through personalized guidance and mentorship.",
  keywords: [
    "mentorship",
    "about us",
    "leadership development",
    "skill transfer",
    "mentor",
  ],
  openGraph: {
    title: "About Us - The Mantle Mentorship",
    description:
      "Discover our mission to transfer practical and life-based skills to future leaders.",
    url: "https://mantlementor.com/about-us",
  },
};

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
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="mx-auto max-w-7xl px-6 space-y-24">
        {/* Header & Why Section */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t("about_us_page.title_about")}{" "}
            <span className="text-[#A020F0]">
              {t("about_us_page.title_us")}
            </span>
          </h1>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              {t("about_us_page.why_title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("about_us_page.why_text")}
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">
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
                className="bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 hover:border-[#A020F0]/50 transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <CardContent className="p-6 flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-[#A020F0]/10 text-[#A020F0] group-hover:bg-[ #A020F0] group-hover:text-white transition-colors">
                    <benefit.icon size={24} />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors">
                    {benefit.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Chief Mentor Section */}
        <div className="bg-neutral-50 dark:bg-neutral-900/30 rounded-3xl p-8 lg:p-12 border border-neutral-200 dark:border-white/5 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden bg-neutral-800">
              {/* Placeholder for Ebuka Umeh's Image */}
              <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
                <span className="sr-only">Ebuka Umeh Image</span>
                <div className="absolute inset-0 bg-linear-to-tr from-[#A020F0]/20 to-neutral-200 dark:to-neutral-800" />
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
                <h2 className="text-3xl font-bold text-foreground">
                  {t("about_us_page.chief_mentor_name")}
                </h2>
                <p className="text-[#A020F0] font-medium text-lg uppercase tracking-wider mt-2">
                  {t("about_us_page.chief_mentor_role")}
                </p>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-base lg:text-md">
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
