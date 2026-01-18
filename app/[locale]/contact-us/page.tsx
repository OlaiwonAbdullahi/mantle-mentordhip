"use client";

import { Button } from "@/components/ui/button";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandYoutube,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const ContactUs = () => {
  const { t } = useTranslation();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!name || !email || !message) {
      setStatus({
        type: "error",
        message:
          t("contact_us_page.fill_all_fields") || "Please fill in all fields",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        name,
        email,
        message,
      });
      setStatus({
        type: "success",
        message:
          t("contact_us_page.success_message") || "Message sent successfully!",
      });
      toast.success(`Message sent successfully!`);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      console.log(error);
      setStatus({
        type: "error",
        message:
          t("contact_us_page.error_message") ||
          "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t("contact_us_page.title_contact")}{" "}
            <span className="text-[#A020F0]">
              {t("contact_us_page.title_us")}
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("contact_us_page.subtitle")}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Contact Form */}
          <div className="space-y-8 rounded-2xl bg-white dark:bg-white/5 p-8 border border-neutral-200 dark:border-white/10 backdrop-blur-sm shadow-xl dark:shadow-2xl">
            <h2 className="text-2xl font-bold text-foreground">
              {t("contact_us_page.send_message")}
            </h2>
            <form className="space-y-6" onSubmit={handleSend}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  {t("contact_us_page.full_name")}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl bg-neutral-50 dark:bg-neutral-900/50 px-4 py-3 text-sm font-medium text-foreground outline-none border border-neutral-200 dark:border-neutral-800 focus:border-[#A020F0] focus:ring-1 focus:ring-[#A020F0] transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  {t("contact_us_page.email_address")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full rounded-xl bg-neutral-50 dark:bg-neutral-900/50 px-4 py-3 text-sm font-medium text-foreground outline-none border border-neutral-200 dark:border-neutral-800 focus:border-[#A020F0] focus:ring-1 focus:ring-[#A020F0] transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  {t("contact_us_page.message")}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  minLength={10}
                  rows={5}
                  className="w-full rounded-xl bg-neutral-50 dark:bg-neutral-900/50 px-4 py-3 text-sm font-medium text-foreground outline-none border border-neutral-200 dark:border-neutral-800 focus:border-[#A020F0] focus:ring-1 focus:ring-[#A020F0] transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600 resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#A020F0] hover:bg-[#A020F0]/90 text-white font-bold py-6 text-lg shadow-lg shadow-[#A020F0]/20 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </span>
                ) : (
                  t("contact_us_page.submit_btn")
                )}
              </Button>
              {status.message && (
                <div
                  className={`mt-4 rounded-xl p-4 text-center text-sm font-medium ${
                    status.type === "success"
                      ? "bg-green-500/10 text-purple-500 border border-green-500/20"
                      : "bg-red-500/10 text-red-500 border border-red-500/20"
                  }`}
                >
                  {status.message}
                </div>
              )}
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-10 lg:py-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                {t("contact_us_page.contact_details")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("contact_us_page.details_text")} <br />
                {t("contact_us_page.response_time")}{" "}
                <span className="text-[#A020F0] font-bold">
                  {t("contact_us_page.response_time_val")}
                </span>
                .
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-[#A020F0]/10 p-3 text-[#A020F0]">
                  <IconMail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">
                    {t("contact_us_page.email_address")}
                  </h3>
                  <a
                    href="mailto:info@mantlementor.com"
                    className="text-muted-foreground hover:text-[#A020F0] transition-colors"
                  >
                    info@mantlementor.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-[#A020F0]/10 p-3 text-[#A020F0]">
                  <IconPhone size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-foreground text-lg">
                    {t("contact_us_page.phone")}
                  </h3>
                  <div className="grid gap-1 text-muted-foreground">
                    <p>
                      <span className="text-foreground/80 font-medium">
                        {t("contact_us_page.region_africa")}
                      </span>{" "}
                      +234 803 897 9738
                    </p>
                    <p>
                      <span className="text-foreground/80 font-medium">
                        {t("contact_us_page.region_europe")}
                      </span>{" "}
                      +33 7 5113 57 27
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="font-bold text-foreground text-lg">
                {t("contact_us_page.social_media")}
              </h3>
              <div className="flex gap-4">
                {[
                  {
                    icon: IconBrandInstagram,
                    href: " https://www.instagram.com/mantlementor/",
                    color: "hover:text-pink-500",
                  },
                  {
                    icon: IconBrandYoutube,
                    href: "https://www.youtube.com/channel/UCYLfc869wMUGarMBQOBtqkg",
                    color: "hover:text-red-500",
                  },
                  {
                    icon: IconBrandLinkedin,
                    href: "https://www.linkedin.com/company/mantle-mentorship-program",
                    color: "hover:text-blue-500",
                  },
                  {
                    icon: IconBrandTiktok,
                    href: "https://www.tiktok.com/@mantle.mentor?_r=1&_t=ZG-92uQLDoTZRo",
                    color: "hover:text-pink-400",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className={`rounded-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 text-muted-foreground dark:text-neutral-400 hover:border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 ${social.color}`}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative Element */}
            <div className="hidden lg:block relative mt-8 h-48 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
              <Image
                src="/contact.jpg"
                alt="Contact Us"
                fill
                className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#A020F0]/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
