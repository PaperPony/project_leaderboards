import React from "react";
import Link from "next/link";

const NavBar = ({ children }) => {
  return (
    <div className="flex flex-row h-screen">
      {/* Side NavBar */}
      {/* Make the navbar on the side of the screen */}
      {/* Add an outline to the navbar */}
      <aside className="w-1/6 h-full bg-gradient-to-b from-purple-300 to-violet-400 dark:bg-gradient-to-b dark:from-violet-950 dark:to-gray-900 bg-opacity-90 dark:bg-opacity-90 border-r-2 border-purple-200 dark:border-violet-900">
        {/* Create a flexbox to hold the links */}
        {/* Space out the items in the flexbox to cover the entirety of the box space */}
        <div className="flex flex-col gap-[20%] justify-center items-center h-full text-center">
          {/* Add the home button */}
          <Link
            href="/games/breakout"
            className="px-[10%] hover:bg-purple-200 dark:hover:bg-violet-900 border-2 border-purple-200 dark:border-violet-900 mx-1 font-bold"
          >
            {" "}
            Breakout{" "}
          </Link>
          <Link
            href="/games/connect4"
            className="px-[10%] hover:bg-purple-200 dark:hover:bg-violet-900 border-2 border-purple-200 dark:border-violet-900 mx-1 purple-200 font-bold"
          >
            {" "}
            Connect 4{" "}
          </Link>
          <Link
            href="/games/snake"
            className="px-[10%] hover:bg-purple-200 dark:hover:bg-violet-900 border-2 border-purple-200 dark:border-violet-900 mx-1 purple-200 font-bold"
          >
            {" "}
            Snake{" "}
          </Link>
          <Link
            href="/games/tictactoe"
            className="px-[10%] hover:bg-purple-200 dark:hover:bg-violet-900 border-2 border-purple-200 dark:border-violet-900 mx-1 purple-200 font-bold"
          >
            Tic Tac Toe{" "}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="w-5/6">{children}</div>
    </div>
  );
};

export default NavBar;
