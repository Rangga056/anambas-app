import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

//TODO: Update ketika sudah ada data

const Hero = () => {
  return (
    <>
      {/* News title  */}
      <h1 className="text-4xl font-bold uppercase">
        NEWS TITLE LOREM IPSUM DOLOR SIT AMET
      </h1>
      <p className="text-sm uppercase mt-2">dd/mm/yyyy</p>

      <div className="flex items-start gap-x-6 mt-4">
        {/* Left section */}
        {/* Update this when the image is ready */}
        <div className="w-full h-[375px] rounded-xl bg-slate-400" />

        {/* Right section */}
        <div className="w-full flex flex-col items-start gap-y-4">
          <p className="text-lg text-balance">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            <br />
            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat.{" "}
          </p>
          {/* Add a link to this button */}
          <Button
            variant="secondary"
            className="text-lg px-6 py-2 rounded-none"
          >
            Read More
          </Button>
        </div>
      </div>
    </>
  );
};

export default Hero;
