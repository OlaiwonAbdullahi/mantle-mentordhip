import { Card, CardContent } from "@/components/ui/card";
import {
  IconBook,
  IconGlobe,
  IconUsers,
  IconBulb,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import Image from "next/image";

const AboutUs = () => {
  const benefits = [
    {
      icon: IconUsers,
      text: "Expert guidance from professional experience with successful mentees across all continents.",
    },
    {
      icon: IconBulb,
      text: "Tailor-made curriculum for each mentee after one-on-one session to project your future mentorship needs",
    },
    {
      icon: IconGlobe,
      text: "Experts in transitions management from the different stage in mentees journey",
    },
    {
      icon: IconUsers,
      text: "Global network of mentees Alumni across 6 continents.",
    },
    {
      icon: IconBook,
      text: "Discounted access to published mentorship books",
    },
    {
      icon: IconUsers,
      text: "Invitation to periodic Mantle Mentorship Alumni Conference where current mentees meet with past mentees and share experiences.",
    },
    {
      icon: IconCurrencyDollar,
      text: "Low commitment fees for the Programs",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 nunito">
      <div className="mx-auto max-w-7xl px-6 space-y-24">
        {/* Header & Why Section */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl sora">
            About <span className="text-[#008000]">Us</span>
          </h1>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white sora">
              Why the Mantle Mentorship Programs?
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              The Mantle Mentorship Programs aims to bring clarity and direction
              to many young people and professionals on their purpose especially
              during different academic and professional transition phases in
              their life based on expert experience from different mentors in
              the past to help steer the mentees to discover their unique path
              to their destiny and purpose for the particular season of their
              life, thereby avoiding costly life and professional mistakes that
              could be sometimes, irreversible.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sora">
              Added Benefits to join the{" "}
              <span className="text-[#008000]">Mantle Mentorship Programs</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-neutral-900/50 border-neutral-800 hover:border-[#008000]/50 transition-all duration-300 group"
              >
                <CardContent className="p-6 flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-[#008000]/10 text-[#008000] group-hover:bg-[#008000] group-hover:text-white transition-colors">
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
                <div className="absolute inset-0 bg-linear-to-tr from-[#008000]/20 to-neutral-800" />
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
                <h2 className="text-3xl font-bold text-white sora">
                  Ebuka Umeh
                </h2>
                <p className="text-[#008000] font-medium text-lg uppercase tracking-wider mt-2">
                  Chief Mentor, Mantle Mentorship Program
                </p>
              </div>

              <div className="space-y-4 text-neutral-400 leading-relaxed text-base lg:text-lg">
                <p>
                  Ebuka Umeh is a business executive that has over 20 years’
                  experience providing mentorship to the different age groups
                  and professionals on both professional and life-based matters.
                  His love for mentoring others and providing uncommon direction
                  to mentees had led to serve in much knowledge-based and youth
                  communities including holding roles as a lead and mentor
                  within Google communities between 2018 – 2023.
                </p>
                <p>
                  In 2021, he held a mentorship session called the Young
                  Founders Masterclass geared to young people between 15 – 25
                  years through Eruptify Academy to provide tutelage on the
                  basic rudiments of setting up a business and scaling for
                  existing businesses for young African youths.
                </p>
                <p>
                  Between 2023 till date, under the platform Youth without Walls
                  (YWY), he conducts an annual mentorship session with youths
                  between 13 – 35 years, providing uncommon knowledge to over
                  150+ youths in Belgium annually. He has successfully mentored
                  many young people in all the continents of the world. He is
                  involved in many public mentoring speaking events across
                  different cultures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
