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
  IconLoader,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import LocationDialog from "../programs/_components/LocationDialog";
import ScheduleDialog from "../programs/_components/ScheduleDialog";

interface ProgramProps {
  id: string;
  title: string;
  description?: string;
  fees?: { amount: string; region: string }[];
  duration?: string;
  classSize?: string | number;
  frequency?: string;
  mode?: string;
  benefits?: string[];
}

interface Course {
  _id: string;
  title: string;
  description: string;
  price_in_ngn: number;
  price_in_euro: number;
  classSize: number;
  frequency: string;
  mode: string;
  benefits: string[];
  duration: string;
}

const ProgramCard = ({
  id,
  title,
  description,
  fees,
  duration,
  classSize,
  frequency,
  mode,
  benefits,
}: ProgramProps) => {
  const { t } = useTranslation();

  return (
    <Card
      className={`relative w-full overflow-hidden transition-all duration-300 max-w-2xl bg-white dark:bg-neutral-950/40 border-neutral-200 dark:border-[#A020F0]/20 shadow-lg shadow-[#A020F0]/5 dark:shadow-[#A020F0]/10 hover:shadow-[#A020F0]/15 dark:hover:shadow-[#A020F0]/20`}
    >
      <CardHeader
        className={`pb-4 border-b border-neutral-100 dark:border-neutral-800`}
      >
        <CardTitle className={`text-2xl font-bold text-foreground`}>
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground text-base mt-2">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="hidden items-start gap-3">
              <div className="p-2 rounded-lg bg-[#A020F0]/10 text-[#A020F0]">
                <IconWorld size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  {t("programs_page.fee_label")}
                </p>
                {fees?.map((fee, i) => (
                  <p key={i} className="text-foreground font-semibold">
                    {fee.amount}{" "}
                    <span className="text-xs text-muted-foreground font-normal">
                      ({fee.region})
                    </span>
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#A020F0]/10 text-[#A020F0]">
                <IconClock size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  {t("programs_page.duration_label")}
                </p>
                <p className="text-foreground font-semibold">{duration}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#A020F0]/10 text-[#A020F0]">
                <IconUsers size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  {t("programs_page.class_size_label")}
                </p>
                <p className="text-foreground font-semibold">{classSize}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#A020F0]/10 text-[#A020F0]">
                <IconCalendar size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  {t("programs_page.frequency_label")}
                </p>
                <p className="text-foreground font-semibold">{frequency}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#A020F0]/10 text-[#A020F0]">
                <IconWorld size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  {t("programs_page.mode_label")}
                </p>
                <p className="text-foreground font-semibold">{mode}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
            {t("programs_page.what_you_get_label")}
          </p>
          <ul className="space-y-3">
            {benefits?.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-neutral-600 dark:text-neutral-300"
              >
                <IconCheck
                  className="text-[#A020F0] shrink-0 mt-0.5"
                  size={18}
                />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <div className="p-6 pt-0 flex item-center justify-between gap-4 md:flex-row flex-col">
        <div className="md:w-1/2 w-full ">
          <LocationDialog courseId={id} programTitle={title} />
        </div>
        <div className="md:w-1/2 w-full">
          <ScheduleDialog courseId={id} programTitle={title} />
        </div>
      </div>
    </Card>
  );
};

const Programs = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses`,
        );
        const json = await response.json();
        console.log(json);
        if (json.success) {
          setCourses(json.data);
        } else {
          setError("Failed to fetch courses");
        }
      } catch (err) {
        setError("An error occurred while fetching courses");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section
      id="programs"
      className="py-24 bg-neutral-50 dark:bg-neutral-900/50"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("programs_page.title_our")}{" "}
            <span className="text-[#A020F0]">
              {t("programs_page.title_programs")}
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("programs_page.subtitle")}
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <IconLoader className="w-10 h-10 text-[#A020F0] animate-spin mb-4" />
            <p className="text-neutral-400">
              {t("loading", "Loading programs...")}
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[#A020F0] text-white rounded-lg hover:bg-[#7C1BB0] transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-8 items-start ${
              courses.length === 1
                ? "grid-cols-1 justify-items-center"
                : "grid-cols-1 lg:grid-cols-2 justify-items-center"
            }`}
          >
            {courses.map((course) => (
              <ProgramCard
                key={course._id}
                id={course._id}
                title={course.title}
                description={course.description}
                fees={[
                  {
                    amount: `₦${course.price_in_ngn.toLocaleString()}`,
                    region: "Nigeria",
                  },
                  {
                    amount: `€${course.price_in_euro.toLocaleString()}`,
                    region: "Europe",
                  },
                ]}
                duration={course.duration}
                classSize={course.classSize}
                frequency={course.frequency}
                mode={course.mode}
                benefits={course.benefits}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Programs;
