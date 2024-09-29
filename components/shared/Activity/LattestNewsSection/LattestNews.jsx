"use client";
/* TODO: This needs to be updated when the final data is obtained */
import React, { useState } from "react";
import LattestCard from "./LattestCard";
// DATA IS ONLY TEMPORARY AS A TRIAL
import { DetailActivityDummy } from "@/constants/DetailActivityDummy";
import { ChevronRight, ChevronLeft } from "lucide-react";
import SectionTag from "../../SectionTag";
import Link from "next/link";

const LattestNews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = DetailActivityDummy.slice(firstPostIndex, lastPostIndex);

  const totalPages = Math.ceil(DetailActivityDummy.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full py-24">
      <SectionTag name={"lattest activities"} />
      {/* Card Section */}
      <div
        className={`flex flex-wrap items-center justify-center ${
          currentPosts.length < 3
            ? "lg:justify-start lg:gap-x-10"
            : "lg:justify-between"
        }`}
      >
        {currentPosts.map((item, index) => (
          <Link href={`/activity/${item.id}`} key={index}>
            <LattestCard
              image={item.image}
              date={item.date}
              title={item.title}
              place={item.place}
            />
          </Link>
        ))}
      </div>

      <div className="flex justify-end items-center mt-4">
        {/* Chevron Left */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${currentPage === 1 ? "text-gray-400" : ""}`}
        >
          <ChevronLeft size={35} />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-1 py-1 rounded text-xl ${
              currentPage === index + 1 ? "font-bold" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Chevron Right */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`mx-1 ${
            currentPage === totalPages ? "text-gray-400" : ""
          }`}
        >
          <ChevronRight size={35} />
        </button>
      </div>
    </div>
  );
};

export default LattestNews;
