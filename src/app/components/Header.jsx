"use client";
import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { PiCoinVerticalLight } from "react-icons/pi";
import { ScoresContext } from "../contexts/Scores";

const Header = () => {
  const { coins } = useContext(ScoresContext);

  return (
    <nav className="overflow-hidden w-screen top-0">
      {/* Header */}
      <div className="flex flex-row justify-between items-center p-4 bg-purple-300 dark:bg-violet-950 bg-opacity-90 dark:bg-opacity-90 border-b-2 border-violet-200 dark:border-violet-900">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/leaderboards.png"
              width={100}
              height={50}
              alt="leaderboards-logo"
            />
          </Link>
          <Link href="/">
            <div className="text-slate-800 dark:text-slate-200 font-bold text-2xl hidden md:block ml-4">
              Home
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <h1 className="text-center text-slate-800 dark:text-slate-200 font-bold text-2xl">
            Welcome To Project Leaderboards!
          </h1>
          <h1>
            <PiCoinVerticalLight className="text-4xl text-slate-800 dark:text-slate-200" />
          </h1>
          <h1 className="text-center text-slate-800 dark:text-slate-200 font-bold text-2xl">
            {coins}
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Header;
