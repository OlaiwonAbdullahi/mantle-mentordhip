import { Button } from "@/components/ui/button";
import { IconArrowUpRight, IconPointFilled } from "@tabler/icons-react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className=" space-y-6 flex flex-col items-center justify-center min-h-screen">
      <div className="">
        <div className=" flex items-center justify-center mb-4">
          <div className=" bg-white/5 w-fit flex text-sm items-center gap-2 backdrop-blur-3xl rounded-full p-1 px-3 nunito text-neutral-300 border border-white/10">
            <span>Virtual</span>
            <IconPointFilled size={12} />
            <span>4 cohorts/yr</span>
            <IconPointFilled size={12} />
            <span>Global</span>
          </div>
        </div>
        <div
          className="flex flex-col items-center  animate-fade-in  mx-auto text-center justify-center"
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold sora text-white leading-tight tracking-tight">
            <span className="bg-linear-to-l from-white via-zinc-300 to-[#008000]/40 bg-clip-text text-transparent">
              The{" "}
            </span>
            Mantle Mentorship{" "}
            <span className="bg-linear-to-r from-white via-zinc-300 to-[#008000]/40 bg-clip-text text-transparent">
              Program
            </span>
          </h2>
          <p className="text-lg text-neutral-300 nunito mt-3">
            Transferring the practical & life-based skill mantle to next future
            leaders.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-center nunito">
        <Button
          size="lg"
          variant={"outline"}
          className="rounded-full  font-bold border bg-transparent text-neutral-300 border-[#008000] hover:bg-[#008000] hover:text-neutral-300 cursor-pointer p-3 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
        >
          <span>LEARN MORE</span>
          <IconArrowUpRight color="#d4d4d4" />
        </Button>
        <Button
          size="lg"
          className="rounded-full hover:bg-transparent hover:text-neutral-300 hover:border hover:border-[#008000] cursor-pointer font-bold bg-[#008000] p-3 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
        >
          <span>APPLY NOW</span>
          <IconArrowUpRight color="#d4d4d4" />
        </Button>
      </div>
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl p-4 shadow-2xl transition-transform duration-700 hover:rotate-2">
        <Image
          src="/hero.jpeg"
          alt="hero"
          width={700}
          height={400}
          className="rounded-2xl w-[700px] h-[300px] object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
