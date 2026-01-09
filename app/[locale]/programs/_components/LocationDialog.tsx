import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { IconChevronRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface LocationDialogProps {
  programTitle?: string;
}

const LocationDialog = ({ programTitle }: LocationDialogProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const handleSelect = (country: string) => {
    const baseUrl = `/${locale}/register`;
    const searchParams = new URLSearchParams();
    if (programTitle) searchParams.append("program", programTitle);
    searchParams.append("country", country);

    const fullUrl = `${baseUrl}?${searchParams.toString()}`;
    router.push(fullUrl);
    console.log("Redirecting to:", fullUrl);
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full h-12 flex items-center nunito justify-center cursor-pointer bg-[#008000] hover:bg-[#006400] text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-[#008000]/20 transition-all active:scale-[0.98]">
        {t("programs_page.enroll_now")}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-neutral-950 nunito md:max-w-[500px]! border-neutral-800 text-white p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold sora flex items-center gap-2">
            {t("location_dialog.title")}
          </DialogTitle>
          <DialogDescription className="text-neutral-400 text-base">
            {t("location_dialog.description")}{" "}
            <span className="text-white font-medium italic">
              {programTitle}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 grid gap-4">
          <Button
            onClick={() => handleSelect("Nigeria")}
            className="group flex items-center cursor-pointer justify-between p-4 h-24 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-[#008000]/50 hover:bg-[#008000]/5 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-neutral-800 group-hover:border-[#008000]/30 transition-colors">
                <Image
                  src="/nigeria.webp"
                  alt="Nigeria"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold sora text-white text-wrap">
                  {t("location_dialog.nigeria_title")}
                </h4>
                <p className="text-sm text-neutral-500 text-wrap">
                  {t("location_dialog.nigeria_desc")}
                </p>
              </div>
            </div>
            <IconChevronRight className="text-neutral-600 group-hover:text-[#008000] transition-colors" />
          </Button>

          <Button
            onClick={() => handleSelect("Europe")}
            className="group flex items-center cursor-pointer justify-between p-4 h-24 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-[#008000]/50 hover:bg-[#008000]/5 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-neutral-800 group-hover:border-[#008000]/30 transition-colors">
                <Image
                  src="/europe.png"
                  alt="Europe"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold sora text-white text-wrap">
                  {t("location_dialog.europe_title")}
                </h4>
                <p className="text-sm text-neutral-500 text-wrap">
                  {t("location_dialog.europe_desc")}
                </p>
              </div>
            </div>
            <IconChevronRight className="text-neutral-600 group-hover:text-[#008000] transition-colors" />
          </Button>
        </div>

        <div className="bg-neutral-900/50 p-4 border-t border-neutral-800">
          <p className="text-xs text-center text-neutral-500">
            {t("location_dialog.footer")}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDialog;
