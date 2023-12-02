import React from "react";
import Link from "next/link";

const NavBar = ({ children }) => {
  return (
    <div className="flex flex-row h-screen">
      {/* Side NavBar */}
      {/* Make the navbar on the side of the screen */}
      <aside className="w-1/6 h-full bg-purple-300 dark:bg-violet-900 bg-opacity-90 dark:bg-opacity-90">
        <div className="flex flex-col justify-start items-center p-4 h-full">
          {/* Add the home button */}
          <Link href="/games/brickbreaker"> Brick Breaker </Link>
          <Link href="/games/connect4"> Connect 4 </Link>
          <Link href="/games/spaceinvaders"> Space Invaders </Link>
          <Link href="/games/tictactoe">Tic Tac Toe </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="w-5/6">{children}</div>
    </div>
  );
};

export default NavBar;
