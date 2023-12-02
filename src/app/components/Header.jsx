import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <nav className="overflow-hidden w-screen top-0">
      {/* Header */}
      {/* Add a border to the bottom of the header */}
      <div className="flex flex-row justify-between items-center p-4 bg-purple-300 dark:bg-violet-950 bg-opacity-90 dark:bg-opacity-90 border-b-2 border-violet-200 dark:border-violet-900">
        <Link href="/">
          {/* Add the leaderboards png */}
          <Image
            src="/leaderboards.png"
            width={100}
            height={50}
            alt="leaderboards-logo"
          />
        </Link>
        {/* Add the centered text, "Welcome To Project Leaderboards" */}
        <h1 className="text-center text-slate-800 dark:text-slate-200 font-bold text-2xl">
          Welcome To Project Leaderboards!
        </h1>
      </div>
    </nav>
  );
};

export default Header;
