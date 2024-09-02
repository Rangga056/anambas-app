import Hero from "@/components/shared/Home/Hero";
import Highlight from "@/components/shared/Home/Highlight";
import News from "@/components/shared/Home/NewsSection/News";
import Image from "next/image";

export default function Home() {
  return (
    <main className="mb-20">
      {/* Hero */}
      <div className="bg-hero-beach-img bg-cover bg-center max-w-screen-2xl mx-auto h-[calc(100vh-80px)] flex items-end p-12 max-h-[750px]">
        <Hero />
      </div>

      {/* Sightseeing spots/ highlights */}
      {/*TODO: Still need to be changed */}
      <div className="mt-20">
        <Highlight />
      </div>

      {/* News component */}
      {/*TODO: Still need to be changed */}
      <div className="mt-20">
        <News />
      </div>
    </main>
  );
}
