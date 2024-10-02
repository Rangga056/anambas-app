import React from "react";
import { Dot } from "lucide-react";

const HeroDetail = ({ DetailActivityDummy }) => {
  return (
    <div className="text-black text-center">
      <div>
        <h1 className="text-5xl font-bold mb-5">{DetailActivityDummy.title}</h1>
        <h2 className="text-2xl w-[800px] mx-auto">{DetailActivityDummy.subtitle}</h2>
        <p className="flex justify-center items-center">
          penerbit <Dot size={70} className="text-black -mx-3" /> 24 August 2024
        </p>
      </div>
    </div>
  );
};

export default HeroDetail;
