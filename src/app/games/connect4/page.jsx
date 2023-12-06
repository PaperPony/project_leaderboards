"use client";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";

const BOARD_ROWS = 6;
const BOARD_COLUMNS = 7;

const Connect4Instructions = () => (
  <div className="flex justify-center items-center">
    <div className="p-2 rounded">
      <h2 className="text-lg font-bold mb-2 text-black dark:text-white">
        How to Play:
      </h2>
      <p className="text-sm text-black dark:text-white mb-2">
        Click on a column to drop your disc.
      </p>
      <p className="text-sm text-black dark:text-white">
        Connect four discs in a row to win!
      </p>
    </div>

    <div className="p-2 rounded">
      <h2 className="text-lg font-bold mb-2 text-black dark:text-white">
        Win to Coin Conversion:
      </h2>
      <p className="text-sm text-black dark:text-white mb-2">
        1 win = 16 coins in Coop Guardian
      </p>
    </div>
  </div>
);

const Connect4Game = () => {
  const [board, setBoard] = useState([
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  const checkWinner = useCallback(() => {
    // Check rows
    for (let row = 0; row < BOARD_ROWS; row++) {
      for (let col = 0; col <= BOARD_COLUMNS - 4; col++) {
        const sequence = board[row].slice(col, col + 4);
        if (checkSequence(sequence)) return sequence[0];
      }
    }

    // Check columns
    for (let col = 0; col < BOARD_COLUMNS; col++) {
      for (let row = 0; row <= BOARD_ROWS - 4; row++) {
        const sequence = [
          board[row][col],
          board[row + 1][col],
          board[row + 2][col],
          board[row + 3][col],
        ];
        if (checkSequence(sequence)) return sequence[0];
      }
    }

    // Check diagonals (left to right)
    for (let row = 0; row <= BOARD_ROWS - 4; row++) {
      for (let col = 0; col <= BOARD_COLUMNS - 4; col++) {
        const sequence = [
          board[row][col],
          board[row + 1][col + 1],
          board[row + 2][col + 2],
          board[row + 3][col + 3],
        ];
        if (checkSequence(sequence)) return sequence[0];
      }
    }

    // Check diagonals (right to left)
    for (let row = 0; row <= BOARD_ROWS - 4; row++) {
      for (let col = 3; col < BOARD_COLUMNS; col++) {
        const sequence = [
          board[row][col],
          board[row + 1][col - 1],
          board[row + 2][col - 2],
          board[row + 3][col - 3],
        ];
        if (checkSequence(sequence)) return sequence[0];
      }
    }

    return null;
  }, [board]);

  const makeComputerMove = useCallback(() => {
    const updatedBoard = [...board];
    const availableColumns = [];

    for (let col = 0; col < BOARD_COLUMNS; col++) {
      if (!board[0][col]) {
        availableColumns.push(col);
      }
    }

    if (availableColumns.length > 0) {
      const randomColumn =
        availableColumns[Math.floor(Math.random() * availableColumns.length)];

      for (let row = BOARD_ROWS - 1; row >= 0; row--) {
        if (!board[row][randomColumn]) {
          updatedBoard[row][randomColumn] = "O";
          break;
        }
      }

      const computerWinner = checkWinner();
      if (computerWinner) {
        setWinner(computerWinner);
      } else {
        setBoard(updatedBoard);
        setCurrentPlayer("X");
      }
    }

    setIsComputerTurn(false); // Allow the user to make a move
  }, [board, checkWinner]);

  useEffect(() => {
    if (isComputerTurn && currentPlayer === "O") {
      // Simulate computer move after a short delay
      const computerMoveTimeout = setTimeout(() => {
        makeComputerMove();
      }, 500); // Adjust the delay as needed

      // Clean up timeout when component unmounts or when user makes a move
      return () => clearTimeout(computerMoveTimeout);
    }
  }, [isComputerTurn, currentPlayer, board, makeComputerMove]);

  const handleClick = (column) => {
    if (winner || board[0][column] || isComputerTurn) return;

    const updatedBoard = [...board];
    for (let row = BOARD_ROWS - 1; row >= 0; row--) {
      if (!board[row][column]) {
        updatedBoard[row][column] = currentPlayer;
        break;
      }
    }

    setBoard(updatedBoard);
    const newWinner = checkWinner();
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setIsComputerTurn(true); // Prevent the user from making a move until the computer moves
      setCurrentPlayer("O");
    }
  };

  const checkSequence = (sequence) => {
    return sequence.every((cell) => cell === sequence[0] && cell !== "");
  };

  const resetGame = () => {
    setBoard([
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ]);
    setCurrentPlayer("X");
    setWinner(null);
    setIsComputerTurn(false);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Connect 4</h1>
      <Connect4Instructions />
      <div className="font-bold text-xl mb-4">
        {winner ? (
          <p className="font-bold text-xl">Winner: {winner}</p>
        ) : (
          <p className="font-bold text-xl">
            Current Player: {currentPlayer === "X" ? "Red" : "Yellow"}
          </p>
        )}
      </div>
      <div className="flex justify-center items-center">
        <div className="bg-white p-4 rounded-md">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center">
              {row.map((cell, columnIndex) => (
                <div
                  key={columnIndex}
                  className={`w-16 h-16 flex items-center justify-center border border-black rounded-full cursor-pointer ${
                    cell === "X"
                      ? "bg-red-500 text-white"
                      : cell === "O"
                        ? "bg-yellow-500 text-black"
                        : ""
                  }`}
                  onClick={() => handleClick(columnIndex)}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Connect4Game;
