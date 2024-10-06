import Hero from "@/components/shared/News/Hero";
import LattestNews from "@/components/shared/Activity/LattestNewsSection/LattestNews";
import SectionTag from "@/components/shared/SectionTag";
import React from "react";

const NewsPage = () => {
  return (
    <div className="container">
      <div className="mt-16">
        <SectionTag name={"hot news"} />
      </div>

      {/* Hero Section  */}
      {/* TODO: Update ketika sudah ada data */}
      <Hero />
      <LattestNews />
    </div>
  );
};

export default NewsPage;
