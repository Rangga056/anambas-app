import Hero from "@/components/shared/News/Hero";
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
    </div>
  );
};

export default NewsPage;
