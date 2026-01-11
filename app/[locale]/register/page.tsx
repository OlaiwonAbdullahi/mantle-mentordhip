"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconUser,
  IconMail,
  IconHelp,
  IconTarget,
  IconSchool,
  IconCalendar,
  IconMessage,
  IconCheck,
  IconPhone,
  IconMapPin,
  IconBrandLinkedin,
  IconCertificate,
  IconUpload,
  IconFileText,
  IconX,
  IconPaywall,
} from "@tabler/icons-react";
import countryList from "country-list";
import { useTranslation } from "react-i18next";

// List of programs for the dropdown
const ALL_PROGRAMS = [
  "General Mantle Mentorship Program",
  "Expert Life Transition Programs",
  "Discipline-Based Skilled Program",
  "Project-Based Acquisition Program",
  "Start-up / Young Business Advisory Programs",
];

const EDUCATION_LEVELS = ["SSCE", "OND", "HND", "BSC", "MSc", "PhD", "Others"];

const COUNTRIES = Array.from(
  new Set(["Nigeria", "Europe", ...countryList.getNames()])
).sort();

const RegistrationForm = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const encodedData = searchParams.get("data");

  let programParam = "";
  let countryParam = "";

  if (encodedData) {
    try {
      const decodedData = JSON.parse(atob(encodedData));
      programParam = decodedData.program || "";
      countryParam = decodedData.country || "";
    } catch (e) {
      console.error("Failed to decode registration data", e);
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: countryParam,
    educationLevel: "",
    linkedin: "",
    motive: "",
    expectations: "",
    program: programParam,
    attendGeneral: "",
    waitlist: "",
    payFee: "",
    challenge: "",
    successMetrics: "",
    comments: "",
    receipt: null as File | null,
    receiptName: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        receipt: file,
        receiptName: file.name,
      }));
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData((prev) => ({ ...prev, receipt: null, receiptName: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Handle form submission logic here
    alert("Application submitted! (This is a demo)");
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-4xl nunito">
      <div className="mb-8 text-center animate-fade-in-up">
        <h1 className="text-3xl font-bold tracking-tighter md:text-5xl text-white sora mb-4">
          {t("registration_page.title")}{" "}
          <span className="text-[#008000]">
            {t("registration_page.title_brand")}
          </span>
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
          {t("registration_page.subtitle")}
        </p>
      </div>

      <Card className="border border-[#008000]/20 shadow-2xl shadow-[#008000]/5 bg-neutral-950/40 animate-fade-in-up md:p-6">
        <CardHeader className="space-y-1 pb-6 border-b border-neutral-800">
          <CardTitle className="text-xl md:text-2xl font-bold sora text-white flex items-center gap-2">
            <IconTarget className="text-[#008000] fill-current/10" />
            {t("registration_page.form_card_title")}
          </CardTitle>
          <CardDescription className="text-neutral-400">
            {t("registration_page.form_card_desc")}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <IconUser size={16} className="text-[#008000]" />{" "}
                  {t("registration_page.labels.full_name")}
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 ring-offset-neutral-950 placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors"
                  placeholder={t("registration_page.placeholders.full_name")}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <IconMail size={16} className="text-[#008000]" />{" "}
                  {t("registration_page.labels.email")}
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 ring-offset-neutral-950 placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors"
                  placeholder={t("registration_page.placeholders.email")}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <IconPhone size={16} className="text-[#008000]" />{" "}
                  {t("registration_page.labels.phone")}
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 ring-offset-neutral-950 placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors"
                  placeholder={t("registration_page.placeholders.phone")}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <IconMapPin size={16} className="text-[#008000]" />{" "}
                  {t("registration_page.labels.country")}
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 ring-offset-neutral-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors appearance-none"
                  required
                >
                  <option value="" disabled>
                    {t("registration_page.placeholders.country_select")}
                  </option>
                  {COUNTRIES.map((country, i) => (
                    <option
                      key={i}
                      value={country}
                      className="bg-neutral-900 text-neutral-200"
                    >
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <IconCertificate size={16} className="text-[#008000]" />{" "}
                  {t("registration_page.labels.education")}
                </label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 ring-offset-neutral-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors appearance-none"
                  required
                >
                  <option value="" disabled>
                    {t("registration_page.placeholders.education_select")}
                  </option>
                  {EDUCATION_LEVELS.map((level, i) => (
                    <option
                      key={i}
                      value={level}
                      className="bg-neutral-900 text-neutral-200"
                    >
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <IconBrandLinkedin size={16} className="text-[#008000]" />{" "}
                  {t("registration_page.labels.linkedin")}
                </label>
                <input
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 ring-offset-neutral-950 placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors"
                  placeholder={t("registration_page.placeholders.linkedin")}
                />
              </div>
            </div>

            {/* Program Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <IconSchool size={16} className="text-[#008000]" />{" "}
                {t("registration_page.questions.program_interest")}
              </label>
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                className="flex h-12 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 ring-offset-neutral-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors appearance-none"
              >
                <option value="" disabled>
                  {t("registration_page.placeholders.program_select")}
                </option>
                {ALL_PROGRAMS.map((prog, i) => (
                  <option
                    key={i}
                    value={prog}
                    className="bg-neutral-900 text-neutral-200"
                  >
                    {prog}
                  </option>
                ))}
              </select>
            </div>

            {/* Motivations */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <IconHelp size={16} className="text-[#008000]" />{" "}
                  {t("registration_page.questions.why_participate")}
                </label>
                <textarea
                  name="motive"
                  value={formData.motive}
                  onChange={handleChange}
                  rows={3}
                  className="flex w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 ring-offset-neutral-950 placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors resize-none"
                  placeholder={t("registration_page.placeholders.motivation")}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <IconTarget size={16} className="text-[#008000]" />{" "}
                  {t("registration_page.questions.expectations")}
                </label>
                <textarea
                  name="expectations"
                  value={formData.expectations}
                  onChange={handleChange}
                  rows={3}
                  className="flex w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 ring-offset-neutral-950 placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors resize-none"
                  placeholder={t("registration_page.placeholders.expectations")}
                  required
                />
              </div>
            </div>

            {/* General Program Specifics */}
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/20 space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
                <IconCalendar size={18} className="text-[#008000]" />{" "}
                {t("registration_page.general_program_details")}
              </h3>

              <div className="space-y-3">
                <label className="text-sm font-medium text-neutral-300 block leading-relaxed">
                  {t("registration_page.questions.general_program_willingness")}
                  <br />
                  <span className="text-xs text-[#008000] font-normal uppercase tracking-wider block mt-1">
                    {t("registration_page.questions.limited_slots")}
                  </span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                    <input
                      type="radio"
                      name="attendGeneral"
                      value="Yes"
                      onChange={handleChange}
                      className="accent-[#008000] w-4 h-4"
                    />{" "}
                    {t("registration_page.yes")}
                  </label>
                  <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                    <input
                      type="radio"
                      name="attendGeneral"
                      value="No"
                      onChange={handleChange}
                      className="accent-[#008000] w-4 h-4"
                    />{" "}
                    {t("registration_page.no")}
                  </label>
                </div>
              </div>

              {formData.attendGeneral === "No" && (
                <div className="space-y-3 animate-fade-in pl-4 border-l-2 border-[#008000]/30">
                  <label className="text-sm font-medium text-neutral-300 block">
                    {t("registration_page.questions.waitlist")}
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                      <input
                        type="radio"
                        name="waitlist"
                        value="Yes"
                        onChange={handleChange}
                        className="accent-[#008000] w-4 h-4"
                      />{" "}
                      {t("registration_page.yes")}
                    </label>
                    <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                      <input
                        type="radio"
                        name="waitlist"
                        value="No"
                        onChange={handleChange}
                        className="accent-[#008000] w-4 h-4"
                      />{" "}
                      {t("registration_page.no")}
                    </label>
                  </div>
                </div>
              )}
              {countryParam != "Nigeria" && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-neutral-300 block leading-relaxed">
                    {t("registration_page.questions.fee_willingness")}
                  </label>
                  {/* Placeholder Account Box for Visual Completeness */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-500 font-mono">
                    <p className="mb-1 uppercase tracking-widest text-[#008000] font-bold">
                      {t("registration_page.bank_details.title")}
                    </p>
                    <div className="flex justify-between">
                      <span>
                        {t("registration_page.bank_details.name_label")}:
                      </span>
                      <span className="text-neutral-400">
                        {t("registration_page.bank_details.name_value")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        {t("registration_page.bank_details.bic_label")}:
                      </span>
                      <span className="text-neutral-400">REVOBEB2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        {t("registration_page.bank_details.iban_label")}:
                      </span>
                      <span className="text-neutral-400">
                        BE27 6504 0298 1473
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        {t("registration_page.bank_details.reference_label")}:
                      </span>
                      <span className="text-neutral-400">
                        {t("registration_page.bank_details.reference_value")}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                      <input
                        type="radio"
                        name="payFee"
                        value="Yes"
                        onChange={handleChange}
                        className="accent-[#008000] w-4 h-4"
                      />{" "}
                      {t("registration_page.yes")}
                    </label>
                    <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                      <input
                        type="radio"
                        name="payFee"
                        value="No"
                        onChange={handleChange}
                        className="accent-[#008000] w-4 h-4"
                      />{" "}
                      {t("registration_page.no")}
                    </label>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                      <IconUpload size={16} className="text-[#008000]" />{" "}
                      {t("registration_page.upload.label")}
                    </label>

                    <div
                      onClick={() =>
                        document.getElementById("receipt-upload")?.click()
                      }
                      className={`
                        relative group cursor-pointer
                        border-2 border-dashed rounded-xl p-8
                        transition-all duration-300
                        flex flex-col items-center justify-center gap-3
                        ${
                          formData.receipt
                            ? "border-[#008000] bg-[#008000]/5"
                            : "border-neutral-800 bg-neutral-900/40 hover:border-[#008000]/50 hover:bg-[#008000]/5"
                        }
                      `}
                    >
                      <input
                        id="receipt-upload"
                        type="file"
                        name="receipt"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,.pdf"
                      />

                      {formData.receipt ? (
                        <div className="flex flex-col items-center gap-2 animate-fade-in text-center">
                          <div className="p-3 rounded-full bg-[#008000]/20 text-[#008000] mb-1">
                            <IconFileText size={28} />
                          </div>
                          <p className="text-sm font-semibold text-white truncate max-w-[250px]">
                            {formData.receiptName}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {t("registration_page.upload.success")}
                          </p>
                          <button
                            onClick={removeFile}
                            className="mt-3 text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1 transition-colors px-3 py-1 bg-neutral-900 rounded-full border border-neutral-800"
                          >
                            <IconX size={14} />{" "}
                            {t("registration_page.upload.remove")}
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="p-4 rounded-full bg-neutral-800 group-hover:bg-[#008000]/10 text-neutral-400 group-hover:text-[#008000] transition-all duration-300 scale-100 group-hover:scale-110">
                            <IconUpload size={32} />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-semibold text-white group-hover:text-[#008000] transition-colors">
                              {t("registration_page.upload.hint")}
                            </p>
                            <p className="text-xs text-neutral-500 mt-1">
                              {t("registration_page.upload.sub_hint")}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Deep Dive Questions */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-start gap-2">
                  <IconTarget
                    size={16}
                    className="text-[#008000] mt-1 shrink-0"
                  />
                  <span>{t("registration_page.questions.challenge")}</span>
                </label>
                <textarea
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  rows={4}
                  className="flex w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 ring-offset-neutral-950 placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors resize-none"
                  placeholder={t(
                    "registration_page.placeholders.generic_answer"
                  )}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-start gap-2">
                  <IconTarget
                    size={16}
                    className="text-[#008000] mt-1 shrink-0"
                  />
                  <span>
                    {t("registration_page.questions.success_metrics")}
                  </span>
                </label>
                <textarea
                  name="successMetrics"
                  value={formData.successMetrics}
                  onChange={handleChange}
                  rows={4}
                  className="flex w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 ring-offset-neutral-950 placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors resize-none"
                  placeholder={t(
                    "registration_page.placeholders.generic_answer"
                  )}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <IconMessage size={16} className="text-[#008000]" />{" "}
                  {t("registration_page.questions.comments")}
                </label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  rows={2}
                  className="flex w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 ring-offset-neutral-950 placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors resize-none"
                  placeholder={t("registration_page.placeholders.optional")}
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-neutral-300 block leading-relaxed">
                  {t("registration_page.questions.willingness_to_attend_next")}
                  <br />
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                    <input
                      type="radio"
                      name="attendGeneral"
                      value="Yes"
                      onChange={handleChange}
                      className="accent-[#008000] w-4 h-4"
                    />{" "}
                    {t("registration_page.yes")}
                  </label>
                  <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                    <input
                      type="radio"
                      name="attendGeneral"
                      value="No"
                      onChange={handleChange}
                      className="accent-[#008000] w-4 h-4"
                    />{" "}
                    {t("registration_page.no")}
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                className="w-full bg-[#008000] hover:bg-[#006400] text-white font-bold h-12 text-lg shadow-lg shadow-[#008000]/20"
              >
                {countryParam != "Nigeria" ? (
                  <>
                    <IconCheck className="mr-2 h-5 w-5" />{" "}
                    {t("registration_page.submit")}
                  </>
                ) : (
                  <>
                    <IconPaywall className="mr-2 h-5 w-5" />{" "}
                    {t("registration_page.pay")}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const Page = () => {
  const { t } = useTranslation();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-[#008000]">
          {t("registration_page.loading")}
        </div>
      }
    >
      <div className="min-h-screen bg-neutral-900/20 bg-grid-white/[0.02]">
        <RegistrationForm />
      </div>
    </Suspense>
  );
};

export default Page;
