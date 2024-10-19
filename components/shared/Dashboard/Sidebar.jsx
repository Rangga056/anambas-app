"use client";

import Image from "next/image";
import React from "react";
import Profile from "@/public/assets/images/default-profile-picture.png";
import {
  siteAdminNav,
  superAdminNav,
  districtAdminNav,
} from "@/constants/Dashboard";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  //change the sidebar based on different admin
  let navItems = [];

  if (pathname.startsWith("/dashboard/super-admin")) {
    navItems = superAdminNav;
  } else if (pathname.startsWith("/dashboard/site-admin")) {
    navItems = siteAdminNav;
  } else if (pathname.startsWith("/dashboard/district-admin")) {
    navItems = districtAdminNav;
  }
  return (
    <div className="w-full h-full flex flex-col items-center gap-y-6">
      <Image
        src={Profile}
        alt="user profile"
        className="w-12 h-12 rounded-full contain object-center"
      />
      {navItems.map((item) => (
        <Link
          href={item.route}
          key={item.route}
          className="p-2 rounded-full flex-center bg-white"
        >
          <Image
            src={item.icon.src}
            width={24}
            height={24}
            alt="sidebar icon"
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
