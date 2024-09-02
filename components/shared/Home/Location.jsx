import React from "react";
import SectionTag from "../SectionTag";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const Location = () => {
  return (
    <div className="container">
      <div className="w-full flex items-center justify-between">
        <SectionTag name={"get direction"} />
        <Link
          href={"https://maps.app.goo.gl/cwk5mBuLvcEFR4d87"}
          className="flex items-center gap-x-4 capitalize text-lg"
        >
          open map <FaArrowRight />
        </Link>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127487.64891077591!2d105.57763716034543!3d3.097575224569314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31c3ae5bd9391671%3A0xe1b9e83a5a42b328!2sKepulauan%20Anambas!5e0!3m2!1sid!2sid!4v1725252900319!5m2!1sid!2sid"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        className="w-full rounded-xl"
      ></iframe>
    </div>
  );
};

export default Location;
