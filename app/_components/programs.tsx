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
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface ProgramProps {
  title: string;
  description: string;
  fees: { amount: string; region: string }[];
  duration: { title: string; subtitle: string };
  classSize: string;
  frequency: string;
  mode: string;
  benefits: string[];
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
}: ProgramProps) => {
  return (
    <Card className="w-full max-w-2xl bg-neutral-950 border-[#008000]/20 shadow-lg shadow-[#008000]/10 hover:shadow-[#008000]/20 transition-all duration-300">
      <CardHeader className="pb-4 border-b border-neutral-800">
        <CardTitle className="text-2xl font-bold text-white sora">
          {title}
        </CardTitle>
        <CardDescription className="text-neutral-400 text-base mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#008000]/10 text-[#008000]">
                <IconWorld size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  Fee
                </p>
                {fees.map((fee, i) => (
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
                  Duration
                </p>
                <p className="text-neutral-200 font-semibold">
                  {duration.title}
                </p>
                <p className="text-xs text-neutral-500">{duration.subtitle}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#008000]/10 text-[#008000]">
                <IconUsers size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  Class Size
                </p>
                <p className="text-neutral-200 font-semibold">{classSize}</p>
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
                  Frequency
                </p>
                <p className="text-neutral-200 font-semibold">{frequency}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#008000]/10 text-[#008000]">
                <IconWorld size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  Mode
                </p>
                <p className="text-neutral-200 font-semibold">{mode}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800">
          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
            What you get
          </p>
          <ul className="space-y-3">
            {benefits.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-neutral-300">
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
          Enroll Now
        </Button>
      </div>
    </Card>
  );
};

const Programs = () => {
  const programsData = [
    {
      title: "General Mantle Mentorship Program",
      description:
        "A comprehensive 6-week mentorship journey designed to equip you with practical and life-based skills for future leadership.",
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
    },
  ];

  return (
    <section id="programs" className="py-24 bg-neutral-900/50 nunito">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl sora">
            Our <span className="text-[#008000]">Programs</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Choose the path that fits your journey to leadership.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
          <div className="md:col-span-2 lg:col-span-3 flex justify-center">
            {programsData.map((program, index) => (
              <ProgramCard key={index} {...program} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
