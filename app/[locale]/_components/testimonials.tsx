"use client";

import { useTranslation } from "react-i18next";
import { IconQuote, IconStarFilled } from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  image: string;
}

const TestimonialCard = ({ name, role, content, image }: TestimonialItem) => {
  return (
    <Card className="bg-white dark:bg-neutral-950/40 border-neutral-100 dark:border-[#A020F0]/20 shadow-lg shadow-[#A020F0]/5 hover:shadow-[#A020F0]/15 transition-all duration-300 group overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <IconQuote size={80} className="text-[#A020F0]" />
      </div>
      <CardContent className="pt-8 pb-8 px-6 relative z-10 flex flex-col h-full">
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <IconStarFilled key={i} size={16} className="text-[#A020F0]" />
          ))}
        </div>

        <p className="text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed italic text-sm">
          &quot;{content}&quot;
        </p>

        <div className="mt-auto flex items-center gap-4">
          <Avatar className="w-12 h-12 cursor-pointer ring-2 ring-transparent hover:ring-emerald-500/50 transition-all">
            <AvatarImage src={image} alt={name} className="object-cover" />
            <AvatarFallback className="bg-linear-to-br from-emerald-500 to-emerald-600 text-white font-semibold">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <h4 className="text-foreground font-bold">{name}</h4>
            <p className="text-muted-foreground text-sm">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonialItems = t("testimonials.items", {
    returnObjects: true,
  }) as TestimonialItem[];

  return (
    <section
      id="testimonials"
      className="py-24 bg-white dark:bg-neutral-900/30 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            {t("testimonials.title_part1")}{" "}
            <span className="text-[#A020F0]">
              {t("testimonials.title_part2")}
            </span>{" "}
            {t("testimonials.title_part3")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(testimonialItems) &&
            testimonialItems.map((item, index) => (
              <div
                key={index}
                className={`h-full animate-fade-in-up`}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <TestimonialCard {...item} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
