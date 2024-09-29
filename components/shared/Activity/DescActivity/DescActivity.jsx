import Image from "next/image";
import React from "react";
import activity from "@/public/assets/images/beach.png";
const DescActivity = ({ DetailActivityDummy }) => {
  return (
    <div className="">
        <Image
          className="h-[400px] w-full object-cover rounded-lg"
          src={activity}
          alt="activity"
        />
        <div className="mt-5">
          <p className="text-black mb-5">{DetailActivityDummy.desc}</p>
          <p className="text-black mb-5">{DetailActivityDummy.desc}</p>
          <Image
          className="h-[400px] w-full object-cover rounded-lg mb-5"
          src={activity}
          alt="activity"
        />
          <p className="text-black mb-5">{DetailActivityDummy.desc}</p>
          <p className="text-black">{DetailActivityDummy.desc}</p>
        </div>
      <div className="">{DetailActivityDummy.title}</div>
    </div>
  );
};

export default DescActivity;
