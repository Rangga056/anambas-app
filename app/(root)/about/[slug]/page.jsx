"use client";

import Destination from "@/components/shared/About/DestinationOption/Destination";
import FAQ from "@/components/shared/FAQs/FAQ";
import Location from "@/components/shared/Home/Location";
import { DetailAboutDummy } from "@/constants/DetailAboutDummy";

const DetailAbout = (props) => {
  const { params } = props; // Ensure params is being passed correctly
  const dummyAbout = DetailAboutDummy.find(
    (comp) => comp.id === parseInt(params.slug)
  );

  if (!dummyAbout) {
    return <div>Kompetisi tidak ditemukan</div>;
  }

  return (
    <div className="container mb-20">
      {/* HERO
        TODO: will be updated */}
      <div className="bg-hero-beach-img bg-cover bg-center max-w-screen-2xl mx-auto h-[calc(100vh-80px)] flex items-end p-12 max-h-[750px] text-white uppercase text-5xl font-bold">
        {dummyAbout.place}
      </div>
      <p className="text-3xl my-10 ml-28 mr-7 ">{dummyAbout.desc}</p>

      {/* DESTINATION OPTION
      TODO: will be updated */}
      {/* <DestinationCard /> */}

      {/* LOCATION
      TODO: will be updated*/}
      <div className="mt-20">
        <Location />
      </div>

      <div className="mt-20">
        <Destination DetailAboutDummy={[dummyAbout]} />
      </div>

      {/* LOCATION
      TODO: will be updated*/}
      <div className="mt-20">
        <FAQ />
      </div>
    </div>
  );
};

export default DetailAbout;
