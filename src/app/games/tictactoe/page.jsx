"use client";
import React, { useEffect, useState, useCallback } from "react";
import { FaRegCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const TicTacToeInstructions = () => (
  <div className="ml-4">
    <div className="p-2 rounded">
      <h2 className="text-lg font-bold mb-2 text-white">How to Play:</h2>
      <p className="text-sm text-white mb-2">
        Click on an empty cell to place your X.
      </p>
      <p className="text-sm text-white">Connect three X in a row to win!</p>
    </div>
  </div>
);

const TicTacToe = () => {
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [isHumanTurn, setIsHumanTurn] = useState(true);

  const checkWinner = useCallback(() => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
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
      }
    }

    if (board.flat().every((cell) => cell !== "")) {
      setWinner("Draw");
    }
  }, [board]);

  const makeAIMove = useCallback(() => {
    let emptyCells = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          emptyCells.push([i, j]);
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      let newBoard = [...board];
      newBoard[randomCell[0]][randomCell[1]] = "O";
      setBoard(newBoard);
      setPlayer("X");
      setIsHumanTurn(true);
    }
  }, [board]);

  const handleCellClick = (i, j) => {
    if (board[i][j] === "" && winner === null && isHumanTurn) {
      let newBoard = [...board];
      newBoard[i][j] = player;
      setBoard(newBoard);
      setPlayer("O");
      setIsHumanTurn(false);
      checkWinner();
    }
  };

  useEffect(() => {
    if (!isHumanTurn && winner === null) {
      setTimeout(() => {
        makeAIMove();
        checkWinner();
      }, 500);
    }
  }, [isHumanTurn, winner, board, checkWinner, makeAIMove]);

  return (
    <div className="flex justify-center gap-8 items-center flex-col">
      <h1 className="text-4xl text-center text-white">Tic Tac Toe</h1>
      <TicTacToeInstructions />
      <div className="flex flex-col items-center justify-center gap-4">
        {board.map((row, i) => (
          <div className="grid grid-cols-3 gap-4" key={i}>
            {row.map((cell, j) => (
              <div
                className="w-20 h-20 bg-black cursor-pointer text-white flex justify-center items-center text-4xl"
                key={j}
                onClick={() => handleCellClick(i, j)}
              >
                {cell === "X" ? (
                  <RxCross1 />
                ) : cell === "O" ? (
                  <FaRegCircle />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="info">
        {winner === null
          ? isHumanTurn
            ? "Your turn"
            : "AI's turn"
          : winner === "Draw"
            ? "Draw"
            : winner === "X"
              ? "You won"
              : "AI won"}
      </div>
      <button
        className="px-4 py-2 text-2xl bg-blue-500 cursor-pointer rounded text-white"
        onClick={() => {
          setBoard([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
          ]);
          setPlayer("X");
          setWinner(null);
          setIsHumanTurn(true);
        }}
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
