import React from "react";
import { Separator } from "@/components/ui/separator";
import NewsCard from "./NewsCard";
import SectionTag from "../../SectionTag";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

//TODO: This component currently uses temporary placeholder contents
//TODO: This compoent not yet responsive
const News = () => {
  return (
    <div className="container ">
      <div className="w-full flex items-center justify-between">
        <SectionTag name={"updated news"} />
        <Link
          href={"/"}
          className="flex items-center gap-x-4 capitalize text-lg"
        >
          see more <FaArrowRight />
        </Link>
      </div>
      <div className="bg-custom-gray rounded-xl px-10 py-16">
        <div className="flex items-start gap-x-4">
          {/* left section */}
          {/*TODO: This needs to be updated when the final data is obtain */}
          <div className="rounded-lg flex flex-col md:w-1/2">
            <div className="w-[550px] h-[400px] bg-slate-100 rounded-tl-xl rounded-tr-xl" />
            <div className="md:w-[550px] flex flex-col items-start gap-y-[.25em] px-6 py-8 bg-slate-400 rounded-br-xl rounded-bl-xl">
              <p className="text-sm uppercase font-thin">hot news</p>
              <h2 className="uppercase text-2xl font-semibold">news title</h2>
              <p className="text-xl text-balance">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam,
              </p>
            </div>
          </div>

          {/* right section */}
          <div className="md:w-1/2">
            <div className="flex items-end flex-col">
              <p className="uppercase text-2xl font-semibold text-right">
                lattest news
              </p>
              <Separator className="w-full mt-2 border border-black" />
            </div>

            {/* News Card Compoent */}
            {/*TODO: Waiting the final data and put in json or object array and map to each card */}
            <div>
              <NewsCard />
              <NewsCard />
              <NewsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
