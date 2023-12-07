"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { ScoresContext } from "../contexts/Scores.jsx";

const NavBar = ({ children }) => {
  const { snakeScore, connectFourScore, breakoutScore, ticTacToeScore } =
    useContext(ScoresContext);
  return (
    <div className="flex flex-row w-screen h-screen">
      {/* Add the high scores of each game to the navbar */}
      <aside className="w-1/6 h-full bg-gradient-to-b from-purple-300 to-violet-400 dark:bg-gradient-to-b dark:from-violet-950 dark:to-gray-900 bg-opacity-90 dark:bg-opacity-90 border-r-2 border-purple-200 dark:border-violet-900">
        <div className="flex flex-col gap-[20%] justify-center items-center h-full text-center">
          {/* Breakout */}
          <div className="flex flex-col items-center">
            <Link
              href="/games/breakout"
              className="px-[10%] hover:bg-purple-200 dark:hover:bg-violet-900 border-2 border-purple-200 dark:border-violet-900 mx-1 font-bold"
              tabIndex="0"
            >
              {" "}
              Breakout{" "}
            </Link>
            <p className="text-black dark:text-white font-bold">
              High Score: {breakoutScore}
            </p>
          </div>

          {/* Connect Four */}
          <div className="flex flex-col items-center">
            <Link
              href="/games/connect4"
              className="px-[10%] hover:bg-purple-200 dark:hover:bg-violet-900 border-2 border-purple-200 dark:border-violet-900 mx-1 purple-200 font-bold"
              tabIndex="0"
            >
              {" "}
              Connect Four{" "}
            </Link>
            <p className="text-black dark:text-white font-bold">
              Wins: {connectFourScore}
            </p>
          </div>

          {/* Snake */}
          <div className="flex flex-col items-center">
            <Link
              href="/games/snake"
              className="px-[10%] hover:bg-purple-200 dark:hover:bg-violet-900 border-2 border-purple-200 dark:border-violet-900 mx-1 purple-200 font-bold"
              tabIndex="0"
            >
              {" "}
              Snake{" "}
            </Link>
            <p className="text-black dark:text-white font-bold">
              High Score: {snakeScore}
            </p>
          </div>

          {/* Tic Tac Toe */}
          <div className="flex flex-col items-center">
            <Link
              href="/games/tictactoe"
              className="px-[10%] hover:bg-purple-200 dark:hover:bg-violet-900 border-2 border-purple-200 dark:border-violet-900 mx-1 purple-200 font-bold"
              tabIndex="0"
            >
              Tic Tac Toe{" "}
            </Link>
            <p className="text-black dark:text-white font-bold">
              Wins: {ticTacToeScore}
            </p>
          </div>
        </div>
      </aside>
      <div className="w-5/6">{children}</div>
    </div>
  );
};

export default NavBar;
