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
  courseId: string;
  programTitle: string;
}

const LocationDialog = ({ courseId, programTitle }: LocationDialogProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const handleSelect = (location: "Africa" | "Europe") => {
    const baseUrl = `/${locale}/register`;

    // Create an object with the data
    const data = {
      courseId: courseId,
      program: programTitle,
      location: location,
    };

    // Convert to JSON string then to Base64
    const encodedData = btoa(JSON.stringify(data));

    const fullUrl = `${baseUrl}?data=${encodedData}`;
    router.push(fullUrl);
    console.log("Redirecting to:", fullUrl);
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full h-12 flex items-center   justify-center cursor-pointer bg-[#A020F0] hover:bg-[#7C1BB0] text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-[#A020F0]/20 transition-all active:scale-[0.98]">
        {t("programs_page.enroll_now")}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-neutral-950   md:max-w-[500px]! border-neutral-800 text-white p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold   flex items-center gap-2">
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
            onClick={() => handleSelect("Africa")}
            className="group flex items-center cursor-pointer justify-between p-4 h-24 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-[#A020F0]/50 hover:bg-[#A020F0]/5 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-neutral-800 group-hover:border-[#A020F0]/30 transition-colors">
                <Image
                  src="/nigeria.webp"
                  alt="Nigeria"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold   text-white text-wrap">
                  {t("location_dialog.nigeria_title")}
                </h4>
                <p className="text-sm text-neutral-500 text-wrap">
                  {t("location_dialog.nigeria_desc")}
                </p>
              </div>
            </div>
            <IconChevronRight className="text-neutral-600 group-hover:text-[#A020F0] transition-colors" />
          </Button>

          <Button
            onClick={() => handleSelect("Europe")}
            className="group flex items-center cursor-pointer justify-between p-4 h-24 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-[#A020F0]/50 hover:bg-[#A020F0]/5 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-neutral-800 group-hover:border-[#A020F0]/30 transition-colors">
                <Image
                  src="/europe.png"
                  alt="Europe"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold   text-white text-wrap">
                  {t("location_dialog.europe_title")}
                </h4>
                <p className="text-sm text-neutral-500 text-wrap">
                  {t("location_dialog.europe_desc")}
                </p>
              </div>
            </div>
            <IconChevronRight className="text-neutral-600 group-hover:text-[#A020F0] transition-colors" />
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
