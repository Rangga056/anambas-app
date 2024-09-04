import React from "react";
import Image from "next/image";

// TODO: This is only a temporary component waiting for final data
const LattestCard = ({ image, date, title }) => {
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
        <p className="uppercase text-sm font-thin">{date}</p>
        <h2 className="uppercase font-semibold text-xl w-full">{title}</h2>
      </div>
    </div>
  );
};

export default LattestCard;
