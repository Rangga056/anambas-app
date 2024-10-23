import React from "react";
import Image from "next/image";

import newsHeroImage from '@/public/assets/images/koala.jpeg'

//TODO: Update ketika sudah ada data

const Hero = () => {
  return (
    <>
      {/* News title  */}
      <div className="flex items-start gap-x-[80px] mt-4">
        {/* Left section */}
        {/* Update this when the image is ready */}
        <div className="w-[850px] h-[321px] rounded-xl overflow-hidden relative">
        <Image
          src={newsHeroImage}
          layout="fill" 
          objectFit="cover"
          alt="koala"
        />
      </div>

        {/* Right section */}
        <div className="w-full flex flex-col items-start gap-y-4">
        <p className="body text-black">Penerbit &#8226; dd/mm/yy</p>
        <h1 className="header-2 uppercase" >lorem ipsum dolor sit amet</h1>
          <p className="paragraph-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            <br />
           {" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;
