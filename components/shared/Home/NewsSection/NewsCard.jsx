import React from "react";

//TODO: This is only a temporary component waiting for final data
const NewsCard = () => {
  return (
    <div className="flex items-end gap-x-3 mt-6">
      <div className="bg-slate-100 w-[275px] aspect-video rounded-xl shadow-slate-400 shadow-md" />
      <div className="h-full flex flex-col justify-end items-start">
        <p className="uppercase text-sm font-thin">DD/MM/YYYY</p>
        <h2 className="uppercase font-semibold text-xl">
          news title lorem ipsum sit dolor amet
        </h2>
      </div>
    </div>
  );
};

export default NewsCard;
