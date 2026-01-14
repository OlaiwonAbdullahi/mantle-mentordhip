/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  IconLoader2,
  IconCircleCheck,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const EDUCATION_LEVELS = ["SSCE", "OND", "HND", "BSC", "MSc", "PhD", "Others"];

const ALL_PROGRAMS = [
  "General Mantle Mentorship Program",
  "Expert Life Transition Programs",
  "Discipline-Based Skilled Program",
  "Project-Based Acquisition Program",
  "Start-up / Young Business Advisory Programs",
];

const RegistrationForm = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const encodedData = searchParams.get("data");
  const reference = searchParams.get("reference");

  let programParam = "";
  let locationParam: "Africa" | "Europe" = "Africa";
  let courseIdParam = "";

  if (encodedData) {
    try {
      const decodedData = JSON.parse(atob(encodedData));
      programParam = decodedData.program || "";
      locationParam = decodedData.location || "Africa";
      courseIdParam = decodedData.courseId || "";
    } catch (e) {
      console.error("Failed to decode registration data", e);
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: locationParam,
    educationLevel: "",
    linkedInProfile: "",
    motivation: "",
    expectedOutcomes: "",
    serviceOffering: programParam,
    willingToAttendNext: false,
    feeCommitment: false,
    challenges: "",
    successMeasurement: "",
    furtherQuestions: "",
    receipt: null as File | null,
    receiptName: "",
    paymentMethod: locationParam === "Africa" ? "paystack" : "manual",
  });

  // Handle Paystack Verification
  useEffect(() => {
    if (reference && !isVerifying && !isSuccess) {
      const verifyPayment = async () => {
        setIsVerifying(true);
        try {
          const response = await fetch(
            "https://mentle-mentorship-backend.onrender.com/api/payments/verify",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ reference }),
            }
          );
          const data = await response.json();
          console.log(data);
          if (data.success) {
            setIsSuccess(true);
            toast.success("Payment verified successfully!");
          } else {
            toast.error(data.message || "Payment verification failed");
          }
        } catch (error) {
          console.error("Verification error:", error);
          toast.error("An error occurred during verification");
        } finally {
          setIsVerifying(false);
        }
      };
      verifyPayment();
    }
  }, [reference]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      const boolValue = value === "Yes";
      setFormData((prev) => ({ ...prev, [name]: boolValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
    e.preventDefault();
    e.stopPropagation();
    setFormData((prev) => ({ ...prev, receipt: null, receiptName: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload: any = {
        courseId: courseIdParam,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        educationLevel: formData.educationLevel,
        linkedInProfile: formData.linkedInProfile,
        serviceOffering: formData.serviceOffering,
        motivation: formData.motivation,
        expectedOutcomes: formData.expectedOutcomes,
        challenges: formData.challenges,
        successMeasurement: formData.successMeasurement,
        furtherQuestions: formData.furtherQuestions,
        willingToAttendNext: formData.willingToAttendNext,
        paymentMethod: formData.paymentMethod,
        feeCommitment: formData.feeCommitment,
      };

      if (formData.location === "Africa") {
        // Africa Flow: Submit then Redirect
        const enrollRes = await fetch(
          "https://mentle-mentorship-backend.onrender.com/api/enrollments",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        const enrollData = await enrollRes.json();
        console.log(enrollData);

        if (!enrollData.success) {
          throw new Error(enrollData.message || "Enrollment failed");
        }

        const paymentRes = await fetch(
          "https://mentle-mentorship-backend.onrender.com/api/payments/initiate",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              courseId: courseIdParam,
              customerName: formData.fullName,
              customerEmail: formData.email,
              customerPhone: formData.phone,
            }),
          }
        );
        const paymentData = await paymentRes.json();
        console.log(paymentData);

        if (paymentData.success && paymentData.data?.authorizationUrl) {
          window.location.href = paymentData.data.authorizationUrl;
        } else {
          throw new Error(paymentData.message || "Payment initiation failed");
        }
      } else {
        // Europe Flow: Multipart upload
        const formDataPayload = new FormData();
        Object.keys(payload).forEach((key) => {
          formDataPayload.append(key, payload[key]);
        });
        if (formData.receipt) {
          formDataPayload.append("receipt", formData.receipt);
        } else {
          throw new Error("Receipt is required for manual payment");
        }

        const enrollRes = await fetch(
          "https://mentle-mentorship-backend.onrender.com/api/enrollments",
          {
            method: "POST",
            body: formDataPayload,
          }
        );
        const enrollData = await enrollRes.json();

        if (enrollData.success) {
          setIsSuccess(true);
          toast.success("Application submitted successfully!");
        } else {
          throw new Error(enrollData.message || "Enrollment failed");
        }
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess || isVerifying) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-md p-8 rounded-3xl border border-[#008000]/20 bg-neutral-950 shadow-2xl"
        >
          {isVerifying ? (
            <div className="space-y-4">
              <IconLoader2
                size={64}
                className="text-[#008000] animate-spin mx-auto"
              />
              <h2 className="text-2xl font-bold text-white sora">
                Verifying Payment...
              </h2>
              <p className="text-neutral-400">
                Please wait while we confirm your transaction with Paystack.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-[#008000]/10 rounded-full w-fit mx-auto">
                <IconCircleCheck size={64} className="text-[#008000]" />
              </div>
              <h2 className="text-3xl font-bold text-white sora">
                Application Received!
              </h2>
              <p className="text-neutral-400">
                {formData.location === "Africa"
                  ? "Your payment was successful and your enrollment is confirmed."
                  : "Your application and receipt have been submitted. Our team will review your manual payment shortly."}
              </p>
              <Button
                onClick={() => router.push("/")}
                className="w-full bg-[#008000] hover:bg-[#006400] text-white font-bold h-12 rounded-xl"
              >
                Return Home
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

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
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <IconUser size={16} className="text-[#008000]" />{" "}
                  {t("registration_page.labels.full_name")}
                </label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors"
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
                  className="flex h-12 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors"
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
                  className="flex h-12 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors"
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
                  name="location"
                  value={formData.location}
                  onChange={(e) => {
                    const val = e.target.value as "Africa" | "Europe";
                    setFormData((prev) => ({
                      ...prev,
                      location: val,
                      paymentMethod: val === "Africa" ? "paystack" : "manual",
                    }));
                  }}
                  className="flex h-12 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors appearance-none"
                  required
                >
                  <option value="Africa">Africa</option>
                  <option value="Europe">Europe</option>
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
                  className="flex h-12 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors appearance-none"
                  required
                >
                  <option value="" disabled>
                    {t("registration_page.placeholders.education_select")}
                  </option>
                  {EDUCATION_LEVELS.map((level, i) => (
                    <option key={i} value={level}>
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
                  name="linkedInProfile"
                  value={formData.linkedInProfile}
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors"
                  placeholder={t("registration_page.placeholders.linkedin")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <IconSchool size={16} className="text-[#008000]" />{" "}
                {t("registration_page.questions.program_interest")}
              </label>
              <select
                name="serviceOffering"
                value={formData.serviceOffering}
                onChange={handleChange}
                className="flex h-12 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors appearance-none"
                required
              >
                <option value="" disabled>
                  {t("registration_page.placeholders.program_select")}
                </option>
                {ALL_PROGRAMS.map((prog, i) => (
                  <option key={i} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <IconHelp size={16} className="text-[#008000]" />{" "}
                  {t("registration_page.questions.why_participate")}
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  rows={3}
                  className="flex w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors resize-none"
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
                  name="expectedOutcomes"
                  value={formData.expectedOutcomes}
                  onChange={handleChange}
                  rows={3}
                  className="flex w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors resize-none"
                  placeholder={t("registration_page.placeholders.expectations")}
                  required
                />
              </div>
            </div>

            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/20 space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
                <IconCalendar size={18} className="text-[#008000]" />{" "}
                {t("registration_page.general_program_details")}
              </h3>

              <div className="space-y-3">
                <label className="text-sm font-medium text-neutral-300 block leading-relaxed">
                  {t("registration_page.questions.willingness_to_attend_next")}
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                    <input
                      type="radio"
                      name="willingToAttendNext"
                      value="Yes"
                      checked={formData.willingToAttendNext === true}
                      onChange={handleChange}
                      className="accent-[#008000] w-4 h-4"
                    />{" "}
                    {t("registration_page.yes")}
                  </label>
                  <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                    <input
                      type="radio"
                      name="willingToAttendNext"
                      value="No"
                      checked={formData.willingToAttendNext === false}
                      onChange={handleChange}
                      className="accent-[#008000] w-4 h-4"
                    />{" "}
                    {t("registration_page.no")}
                  </label>
                </div>
              </div>

              {formData.location === "Europe" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-neutral-300 block leading-relaxed">
                      {t("registration_page.questions.fee_willingness")}
                    </label>
                    <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-500 font-mono">
                      <p className="mb-1 uppercase tracking-widest text-[#008000] font-bold">
                        {t("registration_page.bank_details.title")}
                      </p>
                      <div className="flex justify-between">
                        <span>
                          {t("registration_page.bank_details.name_label")}:
                        </span>{" "}
                        <span className="text-neutral-400">
                          {t("registration_page.bank_details.name_value")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>IBAN:</span>{" "}
                        <span className="text-neutral-400">
                          BE27 6504 0298 1473
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>BIC:</span>{" "}
                        <span className="text-neutral-400">REVOBEB2</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                        <input
                          type="radio"
                          name="feeCommitment"
                          value="Yes"
                          checked={formData.feeCommitment === true}
                          onChange={handleChange}
                          className="accent-[#008000] w-4 h-4"
                          required
                        />{" "}
                        {t("registration_page.yes")}
                      </label>
                      <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                        <input
                          type="radio"
                          name="feeCommitment"
                          value="No"
                          checked={formData.feeCommitment === false}
                          onChange={handleChange}
                          className="accent-[#008000] w-4 h-4"
                        />{" "}
                        {t("registration_page.no")}
                      </label>
                    </div>
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
                      className={`relative group cursor-pointer border-2 border-dashed rounded-xl p-8 transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                        formData.receipt
                          ? "border-[#008000] bg-[#008000]/5"
                          : "border-neutral-800 bg-neutral-900/40 hover:border-[#008000]/50"
                      }`}
                    >
                      <input
                        id="receipt-upload"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,.pdf"
                      />
                      {formData.receipt ? (
                        <div className="flex flex-col items-center gap-2 text-center">
                          <IconFileText size={28} className="text-[#008000]" />
                          <p className="text-sm font-semibold text-white truncate max-w-[250px]">
                            {formData.receiptName}
                          </p>
                          <button
                            onClick={removeFile}
                            className="text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1 transition-colors px-3 py-1 bg-neutral-900 rounded-full border border-neutral-800"
                          >
                            <IconX size={14} />{" "}
                            {t("registration_page.upload.remove")}
                          </button>
                        </div>
                      ) : (
                        <>
                          <IconUpload
                            size={32}
                            className="text-neutral-400 group-hover:text-[#008000]"
                          />
                          <div className="text-center">
                            <p className="text-sm font-semibold text-white group-hover:text-[#008000]">
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

            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-start gap-2">
                  <IconTarget size={16} className="text-[#008000] mt-1" />{" "}
                  <span>{t("registration_page.questions.challenge")}</span>
                </label>
                <textarea
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleChange}
                  rows={3}
                  className="flex w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors resize-none"
                  placeholder={t(
                    "registration_page.placeholders.generic_answer"
                  )}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 flex items-start gap-2">
                  <IconTarget size={16} className="text-[#008000] mt-1" />{" "}
                  <span>
                    {t("registration_page.questions.success_metrics")}
                  </span>
                </label>
                <textarea
                  name="successMeasurement"
                  value={formData.successMeasurement}
                  onChange={handleChange}
                  rows={3}
                  className="flex w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors resize-none"
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
                  name="furtherQuestions"
                  value={formData.furtherQuestions}
                  onChange={handleChange}
                  rows={2}
                  className="flex w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#008000] transition-colors resize-none"
                  placeholder={t("registration_page.placeholders.optional")}
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-[#008000] hover:bg-[#006400] text-white font-bold h-12 text-lg shadow-lg shadow-[#008000]/20 rounded-xl"
              >
                {isSubmitting ? (
                  <IconLoader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : formData.location === "Europe" ? (
                  <IconCheck className="mr-2 h-5 w-5" />
                ) : (
                  <IconPaywall className="mr-2 h-5 w-5" />
                )}
                {isSubmitting
                  ? "Processing..."
                  : formData.location === "Europe"
                  ? t("registration_page.submit")
                  : t("registration_page.pay")}
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
