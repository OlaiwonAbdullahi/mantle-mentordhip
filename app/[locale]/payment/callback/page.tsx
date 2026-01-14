"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  IconLoader,
  IconCircleCheck,
  IconX,
  IconCopy,
  IconUser,
  IconMail,
  IconPhone,
  IconBriefcase,
  IconChevronRight,
  IconSquareRoundedCheck,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface EnrollmentData {
  createdAt: string;
  email: string;
  fullName: string;
  furtherQuestions?: string;
  location: string;
  paidAt?: string;
  paymentMethod: string;
  paystackReference?: string;
  phone: string;
  serviceOffering: string;
  status: string;
}

const SuccessReceipt = ({ data }: { data: EnrollmentData }) => {
  const router = useRouter();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative bg-neutral-950 border border-[#008000]/30 rounded-3xl overflow-hidden shadow-2xl">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-linear-to-r from-transparent via-[#008000] to-transparent opacity-50" />

        <div className="p-8 md:p-10 space-y-8">
          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-[#008000]/10 rounded-full">
              <IconSquareRoundedCheck
                size={48}
                className="text-[#008000]"
                stroke={1.5}
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white sora uppercase tracking-tight">
                Registration Successful
              </h2>
              <p className="text-neutral-400 nunito">
                Your spot in the program has been secured.
              </p>
            </div>
          </div>

          {/* Receipt Content */}
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-[#008000] uppercase tracking-[0.2em] nunito">
                    Student Details
                  </p>
                  <div className="flex items-center gap-3 text-white">
                    <IconUser size={18} className="text-neutral-500" />
                    <span className="font-semibold">{data.fullName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-400 text-sm">
                    <IconMail size={16} className="text-neutral-600" />
                    <span>{data.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-400 text-sm">
                    <IconPhone size={16} className="text-neutral-600" />
                    <span>{data.phone}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-[#008000] uppercase tracking-[0.2em] nunito">
                    Program
                  </p>
                  <div className="flex items-start gap-3 text-white">
                    <IconBriefcase
                      size={18}
                      className="text-neutral-500 mt-1 shrink-0"
                    />
                    <span className="font-semibold leading-tight">
                      {data.serviceOffering}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-[#008000] uppercase tracking-[0.2em] nunito">
                    Transaction Info
                  </p>
                  <div className="flex items-center justify-between text-sm py-1 border-b border-neutral-800/50">
                    <span className="text-neutral-500">Status</span>
                    <span className="text-[#008000] font-bold uppercase text-[10px] bg-[#008000]/10 px-2 py-0.5 rounded-full">
                      {data.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1 border-b border-neutral-800/50">
                    <span className="text-neutral-500">Method</span>
                    <span className="text-white capitalize">
                      {data.paymentMethod}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1">
                    <span className="text-neutral-500">Date</span>
                    <span className="text-white">
                      {formatDate(data.paidAt || data.createdAt)}
                    </span>
                  </div>
                </div>

                {data.paystackReference && (
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-[#008000] uppercase tracking-[0.2em] nunito">
                      Reference
                    </p>
                    <div
                      onClick={() => handleCopy(data.paystackReference!)}
                      className="flex items-center justify-between bg-neutral-900/50 p-2 rounded-lg border border-neutral-800 cursor-pointer hover:bg-neutral-900 transition-colors group"
                    >
                      <span className="text-xs font-mono text-neutral-400 truncate mr-2">
                        {data.paystackReference}
                      </span>
                      <IconCopy
                        size={14}
                        className="text-neutral-600 group-hover:text-[#008000]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Questions Section */}
            {data.furtherQuestions && (
              <div className="p-4 bg-neutral-900/30 rounded-2xl border border-neutral-800/50 space-y-2">
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] nunito">
                  Additional Comments
                </p>
                <p className="text-neutral-300 text-sm italic">
                  &apos;{data.furtherQuestions}&apos;
                </p>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-neutral-800/50 flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => router.push("/")}
              className="flex-1 bg-white hover:bg-neutral-200 text-black font-bold h-12 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Back to Website
              <IconChevronRight size={18} />
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#008000]/5 blur-3xl rounded-full" />
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#008000]/5 blur-3xl rounded-full" />
      </div>

      <p className="text-center text-neutral-500 text-xs mt-6 nunito">
        A confirmation email has been sent to{" "}
        <span className="text-neutral-300">{data.email}</span>. Please check
        your inbox (and spam folder) for further instructions.
      </p>
    </motion.div>
  );
};

const CallbackContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");
  const method = searchParams.get("method");
  const status = searchParams.get("status");

  const [isVerifying, setIsVerifying] = useState(method !== "manual");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData | null>(
    null
  );

  useEffect(() => {
    if (method === "manual" && status === "success") {
      setIsSuccess(true);
      setIsVerifying(false);
      return;
    }

    if (!reference) {
      setError("No transaction reference found.");
      setIsVerifying(false);
      return;
    }

    const verifyPayment = async () => {
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
        console.log("Verification response:", data);

        if (data.success) {
          setEnrollmentData(data.data?.enrollment || data.data);
          setIsSuccess(true);
          toast.success("Payment verified successfully!");
        } else {
          setError(data.message || "Payment verification failed");
          toast.error(data.message || "Payment verification failed");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError("An error occurred during verification");
        toast.error("An error occurred during verification");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [reference, method, status]);

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[70vh] nunito">
      <AnimatePresence mode="wait">
        {isVerifying ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center space-y-6 max-w-md w-full p-8 rounded-3xl border border-[#008000]/20 bg-neutral-950 shadow-2xl"
          >
            <div className="space-y-4">
              <IconLoader
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
          </motion.div>
        ) : isSuccess ? (
          enrollmentData ? (
            <SuccessReceipt key="receipt" data={enrollmentData} />
          ) : (
            <motion.div
              key="generic-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 max-w-md w-full p-8 rounded-3xl border border-[#008000]/20 bg-neutral-950 shadow-2xl"
            >
              <div className="space-y-4">
                <div className="p-4 bg-[#008000]/10 rounded-full w-fit mx-auto">
                  <IconCircleCheck size={64} className="text-[#008000]" />
                </div>
                <h2 className="text-3xl font-bold text-white sora">
                  Application Received!
                </h2>
                <p className="text-neutral-400">
                  {method === "manual"
                    ? "Your application and receipt have been submitted. Our team will review your manual payment shortly."
                    : "Your payment has been verified and your enrollment is confirmed. Welcome to the program!"}
                </p>
                <Button
                  onClick={() => router.push("/")}
                  className="w-full bg-[#008000] hover:bg-[#006400] text-white font-bold h-12 rounded-xl transition-all"
                >
                  Return Home
                </Button>
              </div>
            </motion.div>
          )
        ) : (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 max-w-md w-full p-8 rounded-3xl border border-red-500/20 bg-neutral-950 shadow-2xl"
          >
            <div className="space-y-4">
              <div className="p-4 bg-red-500/10 rounded-full w-fit mx-auto">
                <IconX size={64} className="text-red-500" />
              </div>
              <h2 className="text-3xl font-bold text-white sora">
                Verification Failed
              </h2>
              <p className="text-neutral-400">
                {error ||
                  "We couldn't verify your payment. Please contact support if you believe this is an error."}
              </p>
              <Button
                onClick={() => router.push("/")}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold h-12 rounded-xl transition-all"
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Page = () => {
  const { t } = useTranslation();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-[#008000]">
          <IconLoader className="animate-spin mr-2" />
          {t("loading", "Loading...")}
        </div>
      }
    >
      <div className="min-h-screen bg-neutral-900/20 bg-grid-white/[0.02]">
        <CallbackContent />
      </div>
    </Suspense>
  );
};

export default Page;
