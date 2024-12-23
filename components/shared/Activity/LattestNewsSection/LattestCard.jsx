import React from "react";
import Image from "next/image";
import { MapPin, Dot } from "lucide-react";

// TODO: This is only a temporary component waiting for final data
const LattestCard = ({ image, date, title, place }) => {
  return (
    <div className="items-start mt-6">
      {/* later just add responsive */}
      <div className="w-[400px] aspect-video rounded-xl shadow-slate-100 shadow-md overflow-hidden">
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-full justify-end items-start w-[400px] mt-2">
        <div className="flex items-center">
          <p className="uppercase text-xs">penerbit</p>
          <Dot />
          <p className="uppercase text-xs">{date}</p>
        </div>
        <h2 className="uppercase font-semibold text-xl w-full my-2">{title}</h2>
        <h2 className="uppercase text-xs flex items-center opacity-75">
          <MapPin size={20} className="mr-2" />
          {place}
        </h2>
      </div>
    </div>
  );
};

export default LattestCard;
