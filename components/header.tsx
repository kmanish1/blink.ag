"use client";

import React from "react";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import Unfurl from "./unfurl";
export const Header: React.FC = () => {
  return (
    <header className="fixed w-full p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div className="flex justify-center items-center">
        <Link href="/" className="p-2">
          <HomeIcon size={16} />
          <span className="sr-only">Mehedi</span>
        </Link>
        <div className="p-2 text-xl">blink.ag</div>
      </div>
    </header>
  );
};
export default Header;