import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

const DestinationCard = ({ DetailAboutDummy }) => {
  return (
    <div className="bg-destination h-[calc(100vh-60px)] bg-cover bg-center max-w-screen-2xl flex items-end pb-5 rounded-lg max-h-[750px]">
      {DetailAboutDummy.map((data, index) => (
        <div key={index}>
          <h1 className="text-white uppercase text-5xl font-bold pt- pl-14">
            {data.place}
          </h1>

          <div className="flex px-14 py-10 gap-x-14">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127487.64891077591!2d105.57763716034543!3d3.097575224569314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31c3ae5bd9391671%3A0xe1b9e83a5a42b328!2sKepulauan%20Anambas!5e0!3m2!1sid!2sid!4v1725252900319!5m2!1sid!2sid"
              height="200"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-[800px] rounded-xl"
            ></iframe>
            <div className="w-1/4 flex flex-col justify-between font-extralight">
              <Link
                href="https://maps.app.goo.gl/cwk5mBuLvcEFR4d87"
                className="flex items-center gap-x-2 text-white hover:text-cyan-500"
              >
                Open Maps <ArrowRight size={20} />
              </Link>
              <p className="text-white ">{data.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DestinationCard;
