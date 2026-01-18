"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IconCalendar,
  IconClock,
  IconUser,
  IconLoader,
  IconInfoCircle,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface Schedule {
  _id: string;
  courseId: string;
  title: string;
  description: string;
  week: number;
  facilitator: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface ScheduleDialogProps {
  courseId: string;
  programTitle: string;
}

const ScheduleDialog = ({ courseId, programTitle }: ScheduleDialogProps) => {
  const { t } = useTranslation();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    if (isOpen) {
      const fetchSchedules = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/schedules/courses/${courseId}`,
          );
          const json = await response.json();
          if (json.success) {
            // Sort by week then by date
            const sortedData = json.data.sort((a: Schedule, b: Schedule) => {
              if (a.week !== b.week) return a.week - b.week;
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
            setSchedules(sortedData);
          } else {
            setError("Failed to fetch schedules");
          }
        } catch (err) {
          setError("An error occurred while fetching schedules");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSchedules();
    }
  }, [isOpen, courseId]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-12 rounded-xl bg-transparent border-[#A020F0] text-[#A020F0] text-lg hover:bg-[#A020F0]/20 hover:text-[#A020F0]"
        >
          {t("programs_page.view_schedule", "View Program Schedule")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-neutral-950   md:max-w-[700px] border-neutral-800 text-white p-0 overflow-hidden scrollbar-hide">
        <DialogHeader className="p-6 pb-2 border-b border-neutral-800">
          <DialogTitle className="text-2xl font-bold   flex items-center gap-2">
            <IconCalendar className="text-[#A020F0]" />
            {t("schedule_dialog.title", "Program Schedule")}
          </DialogTitle>
          <DialogDescription className="text-neutral-400 text-base">
            {t(
              "schedule_dialog.description",
              "Weekly breakdown of upcoming sessions for",
            )}{" "}
            <span className="text-white font-medium italic">
              {programTitle}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto p-6 scrollbar-hide">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <IconLoader className="w-10 h-10 text-[#A020F0] animate-spin mb-4" />
              <p className="text-neutral-400">Loading schedule...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="p-3 rounded-full bg-red-500/10 text-red-500 mb-4">
                <IconInfoCircle size={32} />
              </div>
              <p className="text-red-500 font-medium">{error}</p>
              <Button
                variant="ghost"
                className="mt-4 text-[#A020F0] hover:bg-[#A020F0]/10"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>
          ) : schedules.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-neutral-400">
              <div className="mb-4 opacity-20">
                <IconCalendar size={48} />
              </div>
              <p>No schedules found for this program yet.</p>
            </div>
          ) : (
            <div className="space-y-6 scrollbar-hide">
              {schedules.map((schedule) => (
                <div
                  key={schedule._id}
                  className="relative scrollbar-hide pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-neutral-800 last:before:bottom-auto last:before:h-8"
                >
                  <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-[#A020F0] shadow-[0_0_8px_rgba(160,32,240,0.5)]" />

                  <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-5 hover:border-[#A020F0]/30 transition-all group">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#A020F0]/10 text-[#A020F0] text-xs font-bold uppercase tracking-wider">
                          Week {schedule.week}
                        </span>
                        <h4 className="text-lg font-bold   text-white group-hover:text-[#A020F0] transition-colors">
                          {schedule.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-400 text-sm">
                        <IconClock size={16} className="text-[#A020F0]" />
                        {schedule.date ? formatDate(schedule.date) : "TBD"}
                      </div>
                    </div>

                    <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                      {schedule.description}
                    </p>

                    <div className="flex items-center gap-2 pt-4 border-t border-neutral-800/50">
                      <div className="p-1.5 rounded-full bg-neutral-800 text-neutral-400">
                        <IconUser size={14} />
                      </div>
                      <span className="text-xs text-neutral-500">
                        Facilitator:
                      </span>
                      <span className="text-xs font-semibold text-neutral-300">
                        {schedule.facilitator}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-neutral-900/50 p-4 border-t border-neutral-800 flex justify-end">
          <Button
            className="bg-[#A020F0] hover:bg-[#7C1BB0] text-white rounded-xl px-6"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDialog;
