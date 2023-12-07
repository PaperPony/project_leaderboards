"use client";
import { useContext, useEffect } from "react";
import { ScoresContext } from "./contexts/Scores.jsx";
import { sendMessage } from "./msg.jsx";

export default function Home({ children }) {
  const { coins, setCoins } = useContext(ScoresContext);

  useEffect(() => {
    sendMessage({ coins: coins });
    if (typeof window !== "undefined") {
      window.addEventListener(
        "message",
        function (event) {
          sendMessage("**Connection Established**");
          sendMessage({ coins: coins });
          console.log(event.data);
        },
        false
      );
    }
  }, [coins, setCoins]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-b from-violet-200 to-violet-400 dark:bg-gradient-to-t dark:from-gray-900 dark:to-violet-950 h-full w-full">
      <iframe
        id="app-frame"
        src="./EGGG/index.html"
        allow="autoplay"
        title="Coop Guardian Game"
        className="w-full sm:h-2/3 lg:h-full"
      />
    </main>
  );
}
