import React from "react";
import FAQCard from "./FAQCard";
import SectionTag from "../SectionTag";

//TODO: Ganti buat bisa di pass in props array faq
const FAQ = () => {
  return (
    <div className="container w-full">
      <div className="w-full flex items-center justify-between">
        <SectionTag name={"frequently asked questions"} />
      </div>
      <div className="mt-10 grid grid-cols-1 items-center justify-between gap-4">
        <FAQCard />
        <FAQCard />
        <FAQCard />
        <FAQCard />
        <FAQCard />
        <FAQCard />
        <FAQCard />
        <FAQCard />
      </div>
    </div>
  );
};

export default FAQ;
