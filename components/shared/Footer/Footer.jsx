import { navLinks, socials } from "@/constants/Shared";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral-100 pt-12">
      <div className="container flex items-start justify-between w-full">
        {/* left section */}
        <div className="flex flex-col gap-y-6 w-full">
          <div className="flex items-center gap-x-3">
            <div className="w-10 aspect-square rounded-full bg-black" />
            <span className="text-xl uppercase font-bold">Anambas Logo</span>
          </div>
          <div className="flex flex-col gap-y-[1em]">
            <h2 className="text-xl font-bold uppercase">description</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Repudiandae adipisci ut magni voluptates quasi sunt praesentium,
              fuga fugit illum ipsum rerum, temporibus, cupiditate ea totam
              soluta magnam consectetur ipsam laudantium.
            </p>
          </div>
        </div>

        {/* right section */}
        <div className="w-full flex justify-end">
          <div className="flex items-start gap-x-16">
            {/* quick links */}
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl uppercase font-bold">quick links </h1>
              <ul className="flex flex-col gap-y-4">
                {navLinks.map((link) => (
                  <li className="capitalize text-lg" key={link.index}>
                    <Link href={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* social media */}
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl uppercase font-bold">social media </h1>
              <ul className="flex flex-col gap-y-4">
                {socials.map((link) => (
                  <li className="capitalize text-lg" key={link.index}>
                    <Link href={link.url}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* copyright */}
      <div className="bg-blue h-8 py-10 flex items-center mt-16">
        <p className=" text-xl pl-24 text-white container">
          Copyright © 2022 Pemerintah Provinsi Kepulauan Riau
        </p>
      </div>
    </footer>
  );
};

export default Footer;
