"use client";
import React from "react";
import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const TicTacToe = () => {
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const checkWinner = () => {
    const lines = [
      // horizontal
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // vertical
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonal
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (
        board[a % 3][Math.floor(a / 3)] &&
        board[a % 3][Math.floor(a / 3)] === board[b % 3][Math.floor(b / 3)] &&
        board[a % 3][Math.floor(a / 3)] === board[c % 3][Math.floor(c / 3)]
      ) {
        setWinner(board[a % 3][Math.floor(a / 3)]);
        return;
      } else if (
        // Check for draw
        board[0][0] &&
        board[0][1] &&
        board[0][2] &&
        board[1][0] &&
        board[1][1] &&
        board[1][2] &&
        board[2][0] &&
        board[2][1] &&
        board[2][2]
      ) {
        setWinner("Draw");
        return;
      }
    }
  };

  const handleClick = (x, y) => {
    if (board[x][y] || winner) return;

    const newBoard = [...board];
    newBoard[x][y] = player;
    setBoard(newBoard);
    setPlayer(player === "X" ? "O" : "X");
    checkWinner();
  };

  const handleReset = () => {
    setPlayer("X");
    setWinner(null);
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl text-center text-white">Tic Tac Toe</div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <div
            className="w-12 h-12 m-2 text-4xl text-center text-white bg-black cursor-pointer"
            onClick={() => handleClick(0, 0)}
          >
            {board[0][0] === "X" ? (
              <RxCross1 />
            ) : board[0][0] === "O" ? (
              <FaRegCircle />
            ) : (
              ""
            )}
          </div>
          <div
            className="w-12 h-12 m-2 text-4xl text-center text-white bg-black cursor-pointer"
            onClick={() => handleClick(0, 1)}
          >
            {board[0][1] === "X" ? (
              <RxCross1 />
            ) : board[0][1] === "O" ? (
              <FaRegCircle />
            ) : (
              ""
            )}
          </div>
          <div
            className="w-12 h-12 m-2 text-4xl text-center text-white bg-black cursor-pointer"
            onClick={() => handleClick(0, 2)}
          >
            {board[0][2] === "X" ? (
              <RxCross1 />
            ) : board[0][2] === "O" ? (
              <FaRegCircle />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <div
            className="w-12 h-12 m-2 text-4xl text-center text-white bg-black cursor-pointer"
            onClick={() => handleClick(1, 0)}
          >
            {board[1][0] === "X" ? (
              <RxCross1 className="align-middle" />
            ) : board[1][0] === "O" ? (
              <FaRegCircle className="text-center" />
            ) : (
              ""
            )}
          </div>
          <div
            className="w-12 h-12 m-2 text-4xl text-center text-white bg-black cursor-pointer"
            onClick={() => handleClick(1, 1)}
          >
            {board[1][1] === "X" ? (
              <RxCross1 />
            ) : board[1][1] === "O" ? (
              <FaRegCircle />
            ) : (
              ""
            )}
          </div>
          <div
            className="w-12 h-12 m-2 text-4xl text-center text-white bg-black cursor-pointer"
            onClick={() => handleClick(1, 2)}
          >
            {board[1][2] === "X" ? (
              <RxCross1 />
            ) : board[1][2] === "O" ? (
              <FaRegCircle />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <div
            className="w-12 h-12 m-2 text-4xl text-center text-white bg-black cursor-pointer"
            onClick={() => handleClick(2, 0)}
          >
            {board[2][0] === "X" ? (
              <RxCross1 />
            ) : board[2][0] === "O" ? (
              <FaRegCircle />
            ) : (
              ""
            )}
          </div>
          <div
            className="w-12 h-12 m-2 text-4xl text-center text-white bg-black cursor-pointer"
            onClick={() => handleClick(2, 1)}
          >
            {board[2][1] === "X" ? (
              <RxCross1 />
            ) : board[2][1] === "O" ? (
              <FaRegCircle />
            ) : (
              ""
            )}
          </div>
          <div
            className="w-12 h-12 m-2 text-4xl text-center text-white bg-black cursor-pointer"
            onClick={() => handleClick(2, 2)}
          >
            {board[2][2] === "X" ? (
              <RxCross1 />
            ) : board[2][2] === "O" ? (
              <FaRegCircle />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        {winner ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl text-center text-white">
              {winner === "Draw" ? "Draw" : "Winner: " + winner}
            </div>
            <div
              className="w-24 h-12 m-2 text-2xl text-center text-white bg-black cursor-pointer"
              onClick={() => handleReset()}
            >
              Reset
            </div>
          </div>
        ) : (
          <div className="text-4xl text-center text-white">
            Next player: {player}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
