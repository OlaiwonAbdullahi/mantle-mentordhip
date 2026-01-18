"use client";

import { Button } from "@/components/ui/button";
import { IconArrowLeft, IconHome } from "@tabler/icons-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { i18n } = useTranslation();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] w-full overflow-hidden bg-[#1f1f1f]">
      {/* Background decorations matching the theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#A020F0]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center space-y-8 animate-fade-in-up">
        {/* 404 Text */}
        <h1 className="text-[8rem] md:text-[12rem] font-black   leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white/10 to-transparent select-none">
          404
        </h1>

        <div className="-mt-16 md:-mt-24 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold   text-white">
            Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-neutral-400   max-w-lg mx-auto leading-relaxed">
            Oops! The page you are looking for seems to have wandered off. It
            might have been removed, renamed, or doesnt exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-4">
          <Link href={`/${i18n.language}`}>
            <Button
              size="lg"
              className="rounded-full bg-[#A020F0] hover:bg-[#7C1BB0] text-white px-8 h-12 text-base font-bold transition-all duration-300 shadow-lg shadow-[#A020F0]/25 hover:shadow-[#A020F0]/40 hover:-translate-y-0.5   w-full sm:w-auto cursor-pointer"
            >
              <IconHome className="mr-2 h-5 w-5" />
              <span>Go Home</span>
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
            className="rounded-full border-neutral-700 bg-transparent hover:bg-neutral-800 text-neutral-300 hover:text-white px-8 h-12 text-base font-bold transition-all duration-300   w-full sm:w-auto cursor-pointer"
          >
            <IconArrowLeft className="mr-2 h-5 w-5" />
            <span>Go Back</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
