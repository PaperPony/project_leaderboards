"use client";
import { useContext, useEffect } from "react";
import { ScoresContext } from "./contexts/Scores.jsx";
import { Message, sendMessage } from "./msg.jsx";

export default function Home({ children }) {
  const { coins, setCoins } = useContext(ScoresContext);

  useEffect(() => {
    // If the Message event is received, update the coins
    sendMessage({ coins: coins });

    window.addEventListener("message", function (event) {
      if (event.data.coins) {
        setCoins(event.data.coins);
      }
    });
  }, [coins, setCoins, sendMessage]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-b from-violet-200 to-violet-400 dark:bg-gradient-to-t dark:from-gray-900 dark:to-violet-950 h-full w-full">
      <iframe
        id="app-frame"
        src="./EGGG/index.html"
        allow="autoplay"
        title="Coop Guardian Game"
        className="w-full sm:h-2/3 lg:h-full"
      />
      {/* Add a button to increment coins */}
      <button
        className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-4 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600"
        onClick={() => setCoins(coins + 1)}
      >
        Increment Coins
      </button>
    </main>
  );
}
