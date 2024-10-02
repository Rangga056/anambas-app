import React from "react";
import { DetailActivityDummy } from "@/constants/DetailActivityDummy";
import HeroDetail from "@/components/shared/Activity/Hero/HeroDetail";
import Image from "next/image";
import activity from "@/public/assets/images/lattestnews.png";
import DescActivity from "@/components/shared/Activity/DescActivity/DescActivity";
import SideActivity from "@/components/shared/Activity/SideActivity/SideActivity";
const detailActivity = (props) => {
  const { params } = props;
  const dummyActivity = DetailActivityDummy.find(
    (comp) => comp.id === parseInt(params.slug)
  );

  if (!dummyActivity) {
    return <div>Kompetisi tidak ditemukan</div>;
  }
  return (
    <div className="container mb-20">
      {/* HERO */}
      {/* TODO: will be updated */}
      <div className="mt-20">
        <HeroDetail DetailActivityDummy={dummyActivity} />
        <Image
          src={activity}
          alt="activity"
          className="w-full h-[600px] rounded-lg object-cover bg-red-400"
          width={400}
        />
      </div>

      <div className="grid grid-cols-6 gap-4 mt-20">
        <div className="grid-start-1 col-span-5">
          <DescActivity DetailActivityDummy={dummyActivity} />
        </div>
        <div className="col-start-6 col-span-7">
          LATTEST ACTIVITY
          <SideActivity DetailActivityDummy={dummyActivity} />
          <SideActivity DetailActivityDummy={dummyActivity} />
          <SideActivity DetailActivityDummy={dummyActivity} />
          <SideActivity DetailActivityDummy={dummyActivity} />
          <SideActivity DetailActivityDummy={dummyActivity} />
        </div>
      </div>
    </div>
  );
};

export default detailActivity;
