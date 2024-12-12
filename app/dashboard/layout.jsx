"use client";

import Sidebar from "@/components/shared/Dashboard/Sidebar";
import { ChevronRight, X } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  const toggleSideBar = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="max-w-[2160px] mx-auto flex overflow-x-hidden">
      {/* Side Bar Toggle Button */}
      <button
        onClick={toggleSideBar}
        className={`${open ? "left-4 top-1/2" : "left-0"} flex md:hidden absolute top-1/2 -translate-y-24 z-50 bg-black text-white p-2 rounded-r-full bg-opacity-60 hover:bg-opacity-100 focus:bg-opacity-100`}
      >
        {open ? <X size={28} /> : <ChevronRight size={24} />}
      </button>
      {/* Mobile Sidebar */}
      <div className="relative">
        <nav
          className={`bg-black p-4 py-12 fixed min-h-screen transition-transform z-40 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </nav>{" "}
      </div>
      {/* Sidebar */}
      <nav className="bg-black p-4 py-12 hidden md:flex fixed min-h-screen z-40">
        <Sidebar />
      </nav>
      <main
        className={`${open ? "pl-24 w-full" : "p-6 w-full"} p-6 md:p-12 md:pl-24`}
      >
        {children}
      </main>
    </div>
  );
}
