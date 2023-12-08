"use client";
import { createContext, useState } from "react";

export const ScoresContext = createContext();

export const ScoresProvider = ({ children }) => {
  const [coins, setCoins] = useState(1000);
  const [ticTacToeScore, setTicTacToeScore] = useState(0);
  const [snakeScore, setSnakeScore] = useState(0);
  const [connectFourScore, setConnectFourScore] = useState(0);
  const [breakoutScore, setBreakoutScore] = useState(0);

  return (
    <ScoresContext.Provider
      value={{
        coins,
        setCoins,
        ticTacToeScore,
        setTicTacToeScore,
        snakeScore,
        setSnakeScore,
        connectFourScore,
        setConnectFourScore,
        breakoutScore,
        setBreakoutScore,
      }}
    >
      {children}
    </ScoresContext.Provider>
  );
};
