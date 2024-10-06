import React from "react";
import SectionTag from "../../SectionTag";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import DistrictCard from "./DistrictCard";

//TODO: This component currently uses temporary placeholder contents
//TODO: This compoent not yet responsive
const District = () => {
  return (
    <div className="max-w-screen-2xl mx-auto bg-gradient-to-b from-[#102230] to-[#236476] p-10 min-h-[700px]">
      <div className="container">
        <div className="w-full flex items-center justify-between text-white">
          <SectionTag
            name={"about our district"}
            borderColor={"border-white"}
          />
          {/*TODO: Changes thiy to be navigation button or the slider */}
          <div className="flex items-center gap-x-4 text-2xl">
            <FaAngleLeft />
            <FaAngleRight />
          </div>
        </div>

        <div className="flex justify-between gap-x-8 mt-8">
          {/* Left Section */}
          <div className="text-white flex flex-col items-start gap-y-4">
            <h1 className="font-bold text-4xl max-w-[320px] text-wrap mt-16">
              Let's visit the
              <br /> sub-districts in Anambas
              <br /> Islands!
            </h1>
            <Button
              className="capitalize rounded-none text-lg px-4 py-2"
              variant="secondary"
            >
              see more
            </Button>
          </div>

          {/* Right Section */}
          {/*TODO: Create and add District slider here */}
          <div className="flex item-center gap-x-4">
            <DistrictCard />
            <DistrictCard />
            <DistrictCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default District;
