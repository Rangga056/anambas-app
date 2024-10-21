"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { navLinks } from "../../../constants/Shared";

const NavItems = () => {
  const pathname = usePathname();
  // console.log(pathname);
  return (
    <ul className="hidden md:flex items-center gap-x-12 text-neutral-500">
      {navLinks.map((link) => {
        const isActive = pathname === link.path;
        return (
          <li
            key={link.index}
            className={`${
              isActive ? "text-black" : ""
            } font-medium uppercase text-xl`}
          >
            <Link href={link.path}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
