import React from "react";
import Programs from "../_components/programs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Programs - Mentorship & Leadership Development",
  description:
    "Explore our comprehensive mentorship programs designed to develop practical skills and foster future leaders. Find the right program for your growth journey.",
  keywords: [
    "mentorship programs",
    "leadership training",
    "skill development",
    "mentor programs",
    "professional development",
  ],
  alternates: {
    canonical: "/programs",
  },
  openGraph: {
    title: "Our Programs - The Mantle Mentorship",
    description:
      "Explore our comprehensive mentorship programs designed to develop practical skills and foster future leaders.",
    url: "/programs",
  },
};

const Page = () => {
  return (
    <div>
      <Programs />
    </div>
  );
};

export default Page;
