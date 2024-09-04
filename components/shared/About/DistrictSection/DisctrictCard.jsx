import React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const DisctrictCard = () => {
  return (
    <div>
      <Separator className="w-full my-14 border border-black" />
      <div className="flex justify-between h-[236px] gap-x-5">
        <h1 className="text-4xl uppercase font-bold w-1/2">Lorem, ipsum.</h1>
        <div className="w-[280px] flex flex-col h-[90%] justify-between">
          <h4 className="text-xl font-bold">Lorem ipsum dolor sit amet.</h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consequatur, est eos quas soluta deserunt assumenda?
          </p>
          <div className="flex items-center gap-x-2 hover:font-bold">
            <Link href={"/"}>VIEW MORE</Link>
            <ArrowUpRight size={25} />
          </div>
        </div>
        <div className="w-[420px] bg-slate-400 h-full rounded-lg"></div>
      </div>
    </div>
  );
};

export default DisctrictCard;
