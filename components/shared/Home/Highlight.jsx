"use client";
import { useState } from "react";
import gambar1 from "@/public/assets/images/actbanner.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const SightseeingSpots = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    {
      url: gambar1, // Ganti dengan URL gambar Anda
      title: "Place Name 1",
      description: "Description for Place Name 1",
    },
    {
      url: gambar1, // Ganti dengan URL gambar Anda
      title: "Place Name 2",
      description: "Description for Place Name 2",
    },
    {
      url: gambar1, // Ganti dengan URL gambar Anda
      title: "Place Name 3",
      description: "Description for Place Name 3",
    },
  ];

  const handleNext = () => {
    setSelectedImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setSelectedImage(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="w-full container">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        SIGHTSEEING SPOTS
      </h2>
      <div className="relative flex items-center">
        <button
          className="absolute left-0 z-10 text-2xl p-2 bg-white bg-opacity-50 hover:bg-opacity-100 rounded-full focus:outline-none"
          onClick={handlePrevious}
        >
          &#8249;
        </button>
        <div className="flex gap-4 w-full">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.url}
              alt={image.title}
              className={`h-[280px] object-cover object-center cursor-pointer transition-transform duration-300 ease-in-out rounded-xl shadow-lg ${
                selectedImage === index ? "grow w-full" : "grow-0 w-[180px]"
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
        <Button
          className="absolute right-0 z-10 text-2xl p-2 bg-white bg-opacity-50 hover:bg-opacity-100 rounded-full focus:outline-none"
          onClick={handleNext}
        >
          &#8250;
        </Button>
      </div>
      <div className="bg-white p-4 mt-4">
        <h3 className="text-2xl font-bold text-gray-800">
          {images[selectedImage].title}
        </h3>
        <p className="text-gray-600">{images[selectedImage].description}</p>
      </div>
    </div>
  );
};

export default SightseeingSpots;
