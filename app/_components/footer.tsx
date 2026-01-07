import { Button } from "@/components/ui/button";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconPhone,
} from "@tabler/icons-react";
import Image from "next/image";

const Footer = () => {
  return (
    <div>
      <footer className="border-t border-neutral-600 pt-16 pb-16 bg-black/20 nunito">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-row justify-between  gap-16  mb-24">
            <div className="w-1/3 space-y-8">
              <div className="flex items-center gap-3">
                <Image
                  src="/mantleLogo.png"
                  alt="logo"
                  width={75}
                  height={75}
                />
                <span className="text-2xl text-neutral-300 sora tracking-tight font-bold">
                  The Mantle Mentorship Program
                </span>
              </div>
              <p className="text-neutral-400 font-medium leading-relaxed">
                Transferring the practical & life-based skill mantle to next
                future leaders.
              </p>
              <div className="flex gap-4">
                {[IconBrandInstagram, IconBrandFacebook, IconPhone].map(
                  (Icon, i) => (
                    <Button
                      key={i}
                      size="icon"
                      variant="outline"
                      className="rounded-full border-neutral-700 hover:bg-[#008000] hover:text-white hover:border-[#008000] transition-all bg-transparent text-neutral-400"
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  )
                )}
              </div>
            </div>

            <div className="w1/3 space-y-6">
              <h4 className="text-xs  uppercase tracking-[0.2em] text-neutral-200 italic  font-bold">
                Company
              </h4>
              <ul className="space-y-4 text-sm text-neutral-400">
                {["About Us", "Contact Us", "Programs"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="hover:text-[#008000] transition-colors uppercase italic"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-1/3 space-y-8">
              <h4 className="text-xs  uppercase tracking-[0.2em] text-neutral-200 italic font-bold">
                Subscribe to updates
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="email@address.com"
                  className="flex-1 rounded-full bg-neutral-900/50 px-4 text-sm font-bold outline-none border border-neutral-800 focus:border-[#008000]/50 text-neutral-300 transition-all placeholder:text-neutral-600"
                />
                <Button className="rounded-full font-black italic uppercase px-6 bg-[#008000] hover:bg-[#006400] text-white">
                  Join
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between border-t border-neutral-800 pt-12 gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
            <p>
              &copy; {new Date().getFullYear()} The Mantle Mentorship Program.
              All rights reserved.
            </p>
            <div className="flex gap-12 italic">
              <a href="#" className="hover:text-[#008000] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#008000] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
