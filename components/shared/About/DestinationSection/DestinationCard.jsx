import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { MoveRight } from "lucide-react";

const DestinationCard = () => {
  return (
    <div className="bg-slate-400">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        pagination={{
          clickable: true,
          el: ".custom-pagination-faq",
        }}
        navigation={{
          nextEl: ".swiper-button-next-faq",
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper h-96"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
        <div className="custom-pagination-faq"></div>
        <div className="swiper-button-next-faq cursor-pointer bg-transparent p-2">
          <MoveRight size={30} className="text-page-black" />
        </div>
      </Swiper>
    </div>
  );
};

export default DestinationCard;
