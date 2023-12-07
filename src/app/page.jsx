"use client";
import { useContext } from "react";
import { ScoresContext } from "./contexts/Scores.jsx";
import { Message, sendMessage} from "./msg.jsx";

export default function Home() {
  const { coins, snakeScore, connectFourScore, breakoutScore, ticTacToeScore } =
    useContext(ScoresContext);

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-b from-violet-200 to-violet-400 dark:bg-gradient-to-t dark:from-gray-900 dark:to-violet-950">
        <div className="flex flex-col items-center space-y-10">
          <h1 className="text-4xl font-bold text-center text-black dark:text-white">
            Welcome to our website!
          </h1>
          <Message coins={coins}/>
          <p className="text-xl text-center text-black dark:text-white">
            We are a group of students who are learning good design for user
            interfaces!
          </p>
          <p className="text-xl text-center text-black dark:text-white">
            We are currently working on a project for our class, and we hope you
            enjoy it!
          </p>
          <button onClick={() => sendMessage({coins:coins})}>Try it</button>
          <iframe id="app-frame" src="./EGGG/index.html" height="100%" width="100%" allow="autoplay"></iframe>

          {/* Display the user's current coins */}
          <p className="text-xl text-center text-black dark:text-white">
            You have {coins} coins!
          </p>
        </div>
      </main>
    </div>
  );
}

