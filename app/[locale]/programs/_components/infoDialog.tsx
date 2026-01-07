"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconUpload, IconCheck } from "@tabler/icons-react";

export function InfoDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<
    "details" | "bank_details" | "receipt" | "completed"
  >("details");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (value: string) => {
    setFormData({ ...formData, location: value });
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.location === "europe") {
      setStep("bank_details");
    } else if (formData.location === "nigeria") {
      // Simulate Paystack Redirect
      // In a real app, this would redirect to Paystack checkout
      // For now, we'll simulate a successful payment after a brief delay
      // and show the completion/receipt state
      console.log("Redirecting to Paystack for:", formData);
      setTimeout(() => {
        setStep("completed");
      }, 1500);
    }
  };

  const handleBankPaymentRead = () => {
    setStep("receipt");
  };

  const handleReceiptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission of receipt + details
    console.log("Submitting:", { ...formData, receiptFile });
    setStep("completed");
  };

  const resetForm = () => {
    setStep("details");
    setFormData({ name: "", email: "", phone: "", location: "" });
    setReceiptFile(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-neutral-950 nunito border-neutral-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold sora">
            {step === "details" && "Enrollment Details"}
            {step === "bank_details" && "Bank Details (Europe)"}
            {step === "receipt" && "Upload Payment Receipt"}
            {step === "completed" && "Registration Successful"}
          </DialogTitle>
        </DialogHeader>

        {step === "details" && (
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-neutral-300"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#008000]"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-neutral-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#008000]"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-neutral-300"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#008000]"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Location
              </label>
              <Select onValueChange={handleLocationChange} required>
                <SelectTrigger className="border-neutral-800 w-full bg-neutral-900 text-neutral-200">
                  <SelectValue placeholder="Select your region" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-800 text-neutral-200">
                  <SelectItem value="nigeria">Nigeria</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full cursor-pointer bg-[#008000] hover:bg-[#006400] text-white"
            >
              Continue
            </Button>
          </form>
        )}

        {step === "bank_details" && (
          <div className="space-y-6">
            <div className="space-y-4 rounded-lg bg-neutral-900 p-4 border border-neutral-800">
              <div className="space-y-1">
                <p className="text-sm text-neutral-500">Beneficiary</p>
                <p className="font-medium text-neutral-200">
                  Ebuka Valentine Umeh
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-neutral-500">IBAN</p>
                <p className="font-mono text-neutral-200">
                  BE27 6504 0298 1473
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-neutral-500">BIC / SWIFT code</p>
                <p className="font-mono text-neutral-200">REVOBEB2</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-neutral-500">Reference</p>
                <p className="font-medium text-neutral-200">
                  {formData.name || "Your name"}
                </p>
              </div>
            </div>
            <Button
              onClick={handleBankPaymentRead}
              className="w-full bg-[#008000] hover:bg-[#006400] text-white"
            >
              I&apos;ve paid it
            </Button>
          </div>
        )}

        {step === "receipt" && (
          <form onSubmit={handleReceiptSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">
                Upload Receipt
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="receipt-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-800 border-dashed rounded-lg cursor-pointer bg-neutral-900 hover:bg-neutral-800 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <IconUpload className="w-8 h-8 mb-2 text-neutral-500" />
                    <p className="text-sm text-neutral-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  </div>
                  <input
                    id="receipt-file"
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setReceiptFile(e.target.files?.[0] || null)
                    }
                    required
                    accept="image/*,.pdf"
                  />
                </label>
              </div>
              {receiptFile && (
                <p className="text-sm text-[#008000]">
                  Selected: {receiptFile.name}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[#008000] hover:bg-[#006400] text-white"
            >
              Submit Registration
            </Button>
          </form>
        )}

        {step === "completed" && (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 bg-[#008000]/10 rounded-full flex items-center justify-center mx-auto">
              <IconCheck className="w-8 h-8 text-[#008000]" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-white">
                Registration Successful!
              </p>
              <p className="text-neutral-400">
                {formData.location === "nigeria"
                  ? "Your payment was successful."
                  : "We will review your payment and get back to you shortly."}
              </p>
              {formData.location === "nigeria" && (
                <div className="mt-4 p-3 bg-neutral-900 rounded border border-neutral-800">
                  <p className="text-xs text-neutral-500 uppercase">
                    Transaction Reference
                  </p>
                  <p className="font-mono text-[#008000]">PAY-</p>
                </div>
              )}
            </div>
            <Button
              onClick={resetForm}
              variant="outline"
              className="text-white bg-transparent border-neutral-800 hover:bg-neutral-900 hover:text-white w-full"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
