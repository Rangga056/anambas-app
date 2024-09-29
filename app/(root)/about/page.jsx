import District from "@/components/shared/About/DistrictSection/District";
import Hero from "@/components/shared/About/Hero";
import FAQ from "@/components/shared/FAQs/FAQ";

const About = () => {
  // TODO; will be updated
  return (
    <div className="mb-20">
      {/* HERO */}
      {/* hero section will be updated */}
      <div className="bg-hero-beach-img bg-cover bg-center max-w-screen-2xl mx-auto h-[calc(100vh-80px)] flex items-end p-12 max-h-[750px]">
        <Hero />
      </div>
      <div className="container">
        <p className="text-3xl my-10 ml-28 mr-7 ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      {/* DISTRICT */}
      {/* district section will be updated */}
      <div className="mt-20">
        <District />
      </div>

      {/*Faq*/}
      {/* Faw section will be updated */}
      <div className="mt-20">
        <FAQ />
      </div>
    </div>
  );
};

export default About;
