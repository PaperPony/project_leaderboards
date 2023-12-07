"use client";
import { useContext, useEffect } from "react";
import { ScoresContext } from "./contexts/Scores.jsx";
import { sendMessage } from "./msg.jsx";

export default function Home() {
  const { coins, setCoins } = useContext(ScoresContext);

  useEffect(() => {
    // If the Message event is received, update the coins
    window.addEventListener("message", function (event) {
      if (event.data.coins) {
        setCoins(event.data.coins);
      }
    });

    // Send the initial message to the iframe
    sendMessage("**Connection Established**");
    sendMessage({ coins: coins });

    // Send the coins to the iframe every when the iframe is loaded
    document.getElementById("app-frame").onload = function () {
      sendMessage({ coins: coins });
    };
  }, [coins]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-b from-violet-200 to-violet-400 dark:bg-gradient-to-t dark:from-gray-900 dark:to-violet-950 h-full w-full">
      <iframe
        id="app-frame"
        src="./EGGG/index.html"
        allow="autoplay"
        title="Coop Guardian Game"
        className="w-full sm:h-2/3 lg:h-full"
      />
      {/* Display the user's current coins */}
    </main>
  );
}
