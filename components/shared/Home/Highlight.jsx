import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

//TODO: This component currently uses temporary placeholder contents
const Highlight = () => {
  return (
    <section className="container h-fit">
      <div className="flex items-center gap-x-4">
        <Separator className="w-32 my-8 border border-black" />
        <span className="uppercase text-xl">sightseeing spots</span>
      </div>

      <div className="flex items-start justify-between">
        {/* left section */}
        {/*TODO: update this component to be responsive */}
        <div className="flex flex-col gap-y-8 w-3/5">
          {/* image slider */}
          <div className="flex items-end gap-x-4">
            {/*TODO: Change to image slider */}
            <div className="bg-neutral-400 rounded-xl w-[600px] h-[250px]" />
            <div className="bg-neutral-400 rounded-xl w-[100px] aspect-square" />
          </div>

          <div className="flex items-start gap-x-10">
            <div>
              <h1 className="text-3xl font-bold uppercase">place name</h1>
              <p className="text-lg w-[600px] mt-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Possimus ut dolor eaque, similique dolore eius optio ea dicta
                est harum laudantium ipsum a delectus nesciunt! Alias porro nemo
                distinctio quo.
              </p>
            </div>
            {/*WARN: Remove this after adding the image slider */}
            <div className="flex items-center gap-x-2">
              <FaAngleLeft className="text-3xl" />
              <FaAngleRight className="text-3xl" />
            </div>
          </div>
        </div>

        {/* right section */}
        <div className="w-2/5 h-full flex flex-col items-start gap-y-[1em] justify-end">
          <div className="w-full h-[200px]" />
          <h3 className="text-2xl font-bold uppercase">description</h3>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quod
            dicta ad aperiam facere placeat est vitae voluptatem, quae eaque
            voluptatibus aliquid fugit, maiores sunt quia tempore incidunt at
            consequatur.
          </p>

          {/* Go to location button */}
          <div className="flex items-center gap-x-4">
            <Button>Maps</Button>
            <p className="border rounded-md flex items-center justify-center gap-x-2 py-2 px-4 border-black">
              4 <FaStar className="text-xl" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlight;
