"use client";
import React from "react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import NewsCard from "./NewsCard";
import SectionTag from "../../SectionTag";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import gambar1 from "@/public/assets/images/actbanner.png";
import Image from "next/image";

const NewsComponent = () => {
  const router = useRouter();
  const [selectedNews, setSelectedNews] = useState(0);

  const newsData = [
    {
      imageUrl: gambar1, // Ganti dengan URL gambar
      title: "NEWS TITLE LOREM IPSUM DOLOR SIT AMET",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      date: "dd/mm/yy",
      publisher: "Penerbit",
    },
    {
      imageUrl: gambar1, // Ganti dengan URL gambar
      title: "NEWS TITLE LOREM IPSUM DOLOR SIT AMET",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      date: "dd/mm/yy",
      publisher: "Penerbit",
    },
    {
      imageUrl: gambar1, // Ganti dengan URL gambar
      title: "NEWS TITLE LOREM IPSUM DOLOR SIT AMET",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      date: "dd/mm/yy",
      publisher: "Penerbit",
    },
  ];

  return (
    <div className="container">
      <div className="header-3-regular w-full flex items-center justify-between">
        <SectionTag name={"updated news"} />
        <Link
          href={"/news"}
          className="flex items-center gap-x-4 capitalize paragraph-2"
        >
          show more <FaArrowRight />
        </Link>
      </div>
      <div className="flex justify-between items-center"></div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 justify-center">
        <div className="col-span-3">
          <Image
            src={newsData[selectedNews].imageUrl}
            alt={newsData[selectedNews].title}
            className="w-[780px] h-[403px] object-cover rounded-lg mb-2"
          />
          <p className="body text-black">Penerbit &#8226; dd/mm/yy</p>
          <h3 className="header-3-bold text-black">
            NEWS TITLE LOREM IPSUM DOLOR SIT AMET, CONSECTETUR
          </h3>
          <p className="paragraph-2 text-black mt-2 w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit...
          </p>
        </div>
        <div className="flex flex-col md:col-span-2 gap-4">
          {newsData.map((news, index) => (
            <Link
              href={
                "https://anambaskab.go.id/berita/organisasi-perangkat-daerah/prestasi-penurunan-stunting-di-daerah-kabupaten-kepulauan-anambas-raih-penghargaan-dari-kepala-bkkbn-ri"
              }
            >
              <div
                key={index}
                className="flex items-center gap-4 cursor-pointer"
              >
                <Image
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-[180px] h-[180px] object-cover rounded-lg"
                />
                <div>
                  <p className="body text-black">
                    {news.publisher} &#8226; {news.date}
                  </p>
                  <h4 className="header-4 text-black">
                    {news.title}
                  </h4>
                </div>
              </div>
              <Separator className="mt-4" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsComponent;
