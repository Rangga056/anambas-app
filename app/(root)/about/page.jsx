import District from "@/components/shared/About/DistrictSection/District";
import Hero from "@/components/shared/About/Hero";

const About = () => {
    // TODO; will be updated
  return (
    <div className="container">
        {/* HERO */}
        {/* hero section will be updated */}
      <div className="bg-hero-beach-img bg-cover bg-center max-w-screen-2xl mx-auto h-[calc(100vh-80px)] flex items-end p-12 max-h-[750px]">
        <Hero />
      </div>
      <p className="text-3xl my-10 ml-28 mr-7 ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>

      {/* DISTRICT */}
        {/* district section will be updated */}
      <District />  
    </div>
  );
};

export default About;