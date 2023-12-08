"use client";
import { useContext, useEffect } from "react";
import { ScoresContext } from "./contexts/Scores.jsx";
import { sendMessage } from "./msg.jsx";

export default function Home({ children }) {
  const { coins, setCoins } = useContext(ScoresContext);

  // If the coins are updated in the context, send the new coins to the game.
  // If a message is received from the game, update the coins in the context.
  useEffect(() => {
    window.addEventListener("message", function (event) {
      if (event.data.coins) {
        setCoins(event.data.coins);
      } else {
        sendMessage({ coins: coins });
      }
    });
  }, [coins, setCoins]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-b from-violet-200 to-violet-400 dark:bg-gradient-to-t dark:from-gray-900 dark:to-violet-950 h-full w-full">
      <iframe
        id="app-frame"
        src="./EGGG/index.html"
        allow="autoplay"
        title="Coop Guardian Game"
        className="w-full sm:h-2/3 lg:h-full border-4 border-black dark:border-white rounded-lg"
      />
    </main>
  );
}
