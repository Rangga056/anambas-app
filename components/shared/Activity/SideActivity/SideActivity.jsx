import React from "react";
import Image from "next/image";
import { Dot, MapPin } from "lucide-react";

// TODO: This is only a temporary component waiting for final data
const SideActivity = ({ DetailActivityDummy }) => {
  return (
    <div className="items-start mt-6">
        {/* later just add responsive */}        
      <div className="w-[400px] aspect-video rounded-xl shadow-slate-100 shadow-md overflow-hidden">
        <Image
          src={DetailActivityDummy.image}
          // width={image.width}
          // height={image.height}
          alt={DetailActivityDummy.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-full justify-end items-start w-[400px] mt-2">
      <div className="flex items-center">
          <p className="uppercase text-xs">penerbit</p>
          <Dot />
          <p className="uppercase text-xs">{DetailActivityDummy.date}</p>
          </div>
        <h2 className="uppercase font-semibold text-xl w-full">{DetailActivityDummy.title}</h2>
        <h2 className="uppercase text-xs flex items-center opacity-75"><MapPin size={20} className="mr-2"/>{DetailActivityDummy.place}</h2>

      </div>
    </div>
  );
};

export default SideActivity;
