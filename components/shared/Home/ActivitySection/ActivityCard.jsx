import React from "react";

const ActivityCard = () => {
  return (
    <div className="w-[650px] aspect-video rounded-xl bg-slate-500 relative z-0">
      <div className="flex flex-col items-start gap-y-2  text-white absolute bottom-6 left-6 z-10">
        <p className="text-sm uppercase">dd/mm/yyy</p>
        <h2 className="uppercase font-semibold text-2xl">
          news title lorem ipsum dolor sit amet
        </h2>
      </div>
    </div>
  );
};

export default ActivityCard;
