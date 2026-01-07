"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconCheck,
  IconUsers,
  IconCalendar,
  IconClock,
  IconWorld,
  IconLock,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface ProgramProps {
  title: string;
  description?: string;
  fees?: { amount: string; region: string }[];
  duration?: { title: string; subtitle: string };
  classSize?: string;
  frequency?: string;
  mode?: string;
  benefits?: string[];
  isComingSoon?: boolean;
}

const ProgramCard = ({
  title,
  description,
  fees,
  duration,
  classSize,
  frequency,
  mode,
  benefits,
  isComingSoon,
}: ProgramProps) => {
  const { t } = useTranslation();

  return (
    <Card
      className={`relative w-full overflow-hidden transition-all duration-300 ${
        isComingSoon
          ? "bg-neutral-900/30 border-neutral-800"
          : "max-w-2xl bg-neutral-950 border-[#008000]/20 shadow-lg shadow-[#008000]/10 hover:shadow-[#008000]/20"
      }`}
    >
      {isComingSoon && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]">
          <div className="rounded-full bg-[#008000]/20 p-4 mb-2">
            <IconLock className="text-[#008000]" size={32} />
          </div>
          <span className="text-xl font-bold text-white uppercase tracking-widest bg-black/40 px-4 py-1 rounded-lg border border-white/10">
            {t("programs_page.coming_soon")}
          </span>
        </div>
      )}

      <CardHeader
        className={`pb-4 border-b ${
          isComingSoon ? "border-neutral-800/50" : "border-neutral-800"
        }`}
      >
        <CardTitle
          className={`text-2xl font-bold sora ${
            isComingSoon ? "text-neutral-500" : "text-white"
          }`}
        >
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-neutral-400 text-base mt-2">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      {!isComingSoon && (
        <>
          <CardContent className="pt-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#008000]/10 text-[#008000]">
                    <IconWorld size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                      {t("programs_page.fee_label")}
                    </p>
                    {fees?.map((fee, i) => (
                      <p key={i} className="text-neutral-200 font-semibold">
                        {fee.amount}{" "}
                        <span className="text-xs text-neutral-500 font-normal">
                          ({fee.region})
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#008000]/10 text-[#008000]">
                    <IconClock size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                      {t("programs_page.duration_label")}
                    </p>
                    <p className="text-neutral-200 font-semibold">
                      {duration?.title}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {duration?.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#008000]/10 text-[#008000]">
                    <IconUsers size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                      {t("programs_page.class_size_label")}
                    </p>
                    <p className="text-neutral-200 font-semibold">
                      {classSize}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#008000]/10 text-[#008000]">
                    <IconCalendar size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                      {t("programs_page.frequency_label")}
                    </p>
                    <p className="text-neutral-200 font-semibold">
                      {frequency}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#008000]/10 text-[#008000]">
                    <IconWorld size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                      {t("programs_page.mode_label")}
                    </p>
                    <p className="text-neutral-200 font-semibold">{mode}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
                {t("programs_page.what_you_get_label")}
              </p>
              <ul className="space-y-3">
                {benefits?.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-neutral-300"
                  >
                    <IconCheck
                      className="text-[#008000] shrink-0 mt-0.5"
                      size={18}
                    />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <div className="p-6 pt-0">
            <Button className="w-full bg-[#008000] hover:bg-[#006400] text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-[#008000]/20">
              {t("programs_page.enroll_now")}
            </Button>
          </div>
        </>
      )}

      {isComingSoon && (
        <CardContent className="pb-8">
          <p className="text-neutral-500 italic">
            {t("programs_page.in_development")}
          </p>
        </CardContent>
      )}
    </Card>
  );
};

const Programs = () => {
  const { t } = useTranslation();

  const activeProgram = {
    title: t("programs_page.program_general_title"),
    description: t("programs_page.program_general_desc"),
    fees: [
      { amount: "₦100,000", region: "Africa" },
      { amount: "€100", region: "Europe" },
    ],
    duration: { title: "6 Weeks", subtitle: "6 Saturdays" },
    classSize: "10 – 20 Students",
    frequency: "4 Cohorts / Year",
    mode: "Virtual",
    benefits: [
      "Personalized further mentorship plan",
      "Certificate of Completion",
      "One-on-one mentorship session",
      "Access to Mantle Mentorship social network",
      "Mentorship from Ebuka Umeh & seasoned mentors",
    ],
    isComingSoon: false,
  };

  const upcomingPrograms = [
    {
      title: t("programs_page.program_hs_uni"),
      isComingSoon: true,
    },
    {
      title: t("programs_page.program_tertiary_job"),
      isComingSoon: true,
    },
    {
      title: t("programs_page.program_tertiary_ent"),
      isComingSoon: true,
    },
    {
      title: t("programs_page.program_job_school"),
      isComingSoon: true,
    },
    { title: t("programs_page.program_career_change"), isComingSoon: true },
    {
      title: t("programs_page.program_hs_poly"),
      isComingSoon: true,
    },
    {
      title: t("programs_page.program_poly_uni"),
      isComingSoon: true,
    },
    { title: t("programs_page.program_discipline"), isComingSoon: true },
    { title: t("programs_page.program_project"), isComingSoon: true },
    { title: t("programs_page.program_startup"), isComingSoon: true },
  ];

  return (
    <section id="programs" className="py-24 bg-neutral-900/50 nunito">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl sora">
            {t("programs_page.title_our")}{" "}
            <span className="text-[#008000]">
              {t("programs_page.title_programs")}
            </span>
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            {t("programs_page.subtitle")}
          </p>
        </div>

        {/* Active Program */}
        <div className="flex justify-center mb-24">
          <ProgramCard {...activeProgram} />
        </div>

        {/* Upcoming Programs Header */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl sora">
            {t("programs_page.review_upcoming_title")}{" "}
            <span className="text-[#008000]">
              {t("programs_page.review_upcoming_subtitle")}
            </span>{" "}
            {t("programs_page.review_upcoming_programs")}
          </h2>
          <p className="mt-4 text-base text-neutral-400">
            {t("programs_page.review_upcoming_desc")}
          </p>
        </div>

        {/* Coming Soon Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingPrograms.map((program, index) => (
            <ProgramCard key={index} {...program} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
