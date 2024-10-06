import React from "react";
import SectionTag from "../../SectionTag";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import ActivityCard from "./ActivityCard";

const Activity = () => {
  return (
    <div className="container">
      <div className="w-full flex items-center justify-between">
        <SectionTag name={"updated activities"} />
        <Link
          href={"/"}
          className="flex items-center gap-x-4 capitalize text-lg"
        >
          Show More <FaArrowRight />
        </Link>
      </div>

      {/*TODO: Create and Add the Activity Slider here */}
      <div className="flex items-center gap-x-4">
        {/*TODO: Put the activity card in the slider by mapping all the activity data */}
        <ActivityCard />
        <ActivityCard />
      </div>
    </div>
  );
};

export default Activity;
