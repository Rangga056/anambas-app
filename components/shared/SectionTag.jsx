import React from "react";
import { Separator } from "../ui/separator";

const SectionTag = ({ name }) => {
  return (
    <div className="flex items-center gap-x-4">
      <Separator className="w-32 my-8 border border-black" />
      <span className="uppercase text-xl">{name}</span>
    </div>
  );
};

export default SectionTag;
