import React from "react";
import NavItems from "./NavItems";


const Header = () => {
  return (
    <header className="flex items-center justify-between container h-20">
      {/* Logo  */}
      <div className="flex items-center gap-x-3">
        <div className="w-10 aspect-square rounded-full bg-black" />
        <span className="text-xl uppercase">Anambas Logo</span>
      </div>

      {/* NavItems */}
      <nav>
        <NavItems />
      </nav>
    </header>
  );
};

export default Header;
