"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconCheck,
  IconSchool,
  IconBook,
  IconBulb,
  IconRocket,
  IconMail,
  IconChevronUp,
  IconChevronDown,
} from "@tabler/icons-react";

interface Program {
  id: string;
  title: string;
  icon: React.ReactNode;
  subItems?: string[];
}

const programs: Program[] = [
  {
    id: "p1",
    title: "Expert Life Transition Programs",
    icon: <IconSchool className="h-5 w-5 text-[#008000]" />,
    subItems: [
      "High School to University Transition Program",
      "Tertiary Institution to Job Market Transition Program",
      "Tertiary Institution to Entrepreneurship Transition Program",
      "Job Market to Back-to-School Transition Programs",
      "Career Change Transition Programs",
      "High School to Polytechnic Transition Program",
      "Polytechnic to University Transition Program",
    ],
  },
  {
    id: "p2",
    title: "Discipline-Based Skilled Program",
    icon: <IconBook className="h-5 w-5 text-[#008000]" />,
  },
  {
    id: "p3",
    title: "Project-Based Acquisition Program",
    icon: <IconBulb className="h-5 w-5 text-[#008000]" />,
  },
  {
    id: "p4",
    title: "Start-up / Young Business Advisory Programs",
    icon: <IconRocket className="h-5 w-5 text-[#008000]" />,
  },
];

const ComingSoon = () => {
  // Set the first program (with sub-items) to be open by default
  const [openProgramId, setOpenProgramId] = useState<string | null>("p1");

  const toggleProgram = (id: string) => {
    setOpenProgramId(openProgramId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-neutral-900/50 nunito">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left Side: Programs List */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white sora mb-4">
                Upcoming <span className="text-[#008000]">Programs</span>
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed">
                Be the first to access our new curated courses designed to
                accelerate your growth and career transition.
              </p>
            </div>

            <div className="space-y-4">
              {programs.map((program) => (
                <div
                  key={program.id}
                  className={`group rounded-xl border bg-neutral-950/40 transition-all duration-200 overflow-hidden ${
                    openProgramId === program.id
                      ? "border-[#008000]/50 shadow-lg shadow-[#008000]/10"
                      : "border-neutral-800 hover:border-[#008000]/30"
                  }`}
                >
                  <button
                    onClick={() => toggleProgram(program.id)}
                    className="flex items-center justify-between w-full p-5 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-[#008000]/10 transition-colors">
                        {program.icon}
                      </div>
                      <span className=" text-lg sora text-white">
                        {program.title}
                      </span>
                    </div>
                    {program.subItems && (
                      <div className="text-neutral-500 group-hover:text-[#008000] transition-colors">
                        {openProgramId === program.id ? (
                          <IconChevronUp className="h-5 w-5" />
                        ) : (
                          <IconChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    )}
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openProgramId === program.id && program.subItems
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {program.subItems && (
                        <ul className="px-5 pb-5 pt-0 space-y-3 border-t border-dashed border-neutral-800 mt-2">
                          <div className="h-2"></div>
                          {program.subItems.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-neutral-400 hover:text-white transition-colors p-2 rounded-md hover:bg-white/5"
                            >
                              <IconCheck className="h-5 w-5 text-[#008000] shrink-0 mt-0.5" />
                              <span className="text-sm font-medium leading-normal">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Waitlist Form */}
          <div
            className="lg:sticky lg:top-8 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Card className="border border-[#008000]/20 shadow-2xl shadow-[#008000]/5 bg-neutral-950/40 overflow-hidden">
              <CardHeader className="space-y-1 pb-2">
                <CardTitle className="text-2xl font-bold sora text-white">
                  Join the Waitlist
                </CardTitle>
                <CardDescription className="text-neutral-400">
                  Get early access and exclusive updates when we launch.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-5 mt-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none text-neutral-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      className="flex h-11 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-sm text-neutral-200 ring-offset-neutral-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-[#008000]/50"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none text-neutral-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-11 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-sm text-neutral-200 ring-offset-neutral-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-[#008000]/50"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      size="lg"
                      className="w-full font-bold text-md cursor-pointer bg-[#008000] hover:bg-[#006400] text-white shadow-lg shadow-[#008000]/20 transition-all border-0"
                    >
                      <IconMail className="mr-2 h-4 w-4" />
                      Notify Me When It&apos;s Ready
                    </Button>
                  </div>

                  <p className="text-xs text-center text-neutral-500 mt-4">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
