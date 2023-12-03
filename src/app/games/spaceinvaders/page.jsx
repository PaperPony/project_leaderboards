"use client";
import React, { useState, useEffect } from "react";

const SpaceInvaders = () => {
  //   const [player, setPlayer] = useState({ x: 200, y: 400 });
  //   const [bullets, setBullets] = useState([]);
  //   const [monsters, setMonsters] = useState(generateMonsters());
  //   const [gameOver, setGameOver] = useState(false);
  //   const [gameWon, setGameWon] = useState(false);

  //   function generateMonsters() {
  //     const monsters = [];
  //     const columns = 10;
  //     const rows = 6;
  //     const spacing = 40;

  //     for (let col = 0; col < columns; col++) {
  //       for (let row = 0; row < rows; row++) {
  //         monsters.push({
  //           id: col * rows + row,
  //           x: col * spacing,
  //           y: row * spacing,
  //           alive: true,
  //         });
  //       }
  //     }

  //     return monsters;
  //   }

  //   const handleKeyPress = (e) => {
  //     if (e.key === "ArrowLeft" && player.x > 0) {
  //       setPlayer((prev) => ({ ...prev, x: prev.x - 10 }));
  //     } else if (e.key === "ArrowRight" && player.x < 380) {
  //       setPlayer((prev) => ({ ...prev, x: prev.x + 10 }));
  //     } else if (e.key === " " && !gameOver && !gameWon) {
  //       // Shoot bullet when spacebar is pressed
  //       setBullets((prev) => [
  //         ...prev,
  //         { id: Date.now(), x: player.x + 8, y: player.y },
  //       ]);
  //     }
  //   };

  //   const checkCollisions = () => {
  //     // Check player-bullet collisions
  //     const updatedMonsters = monsters.map((monster) => {
  //       for (const bullet of bullets) {
  //         if (
  //           monster.alive &&
  //           bullet.x < monster.x + 20 &&
  //           bullet.x + 5 > monster.x &&
  //           bullet.y < monster.y + 20 &&
  //           bullet.y + 10 > monster.y
  //         ) {
  //           // Monster hit, mark it as not alive
  //           return { ...monster, alive: false };
  //         }
  //       }
  //       return monster;
  //     });

  //     // Check monster-bullet collisions
  //     const updatedBullets = bullets.filter((bullet) => {
  //       let hitMonster = false;
  //       for (const monster of monsters) {
  //         if (
  //           monster.alive &&
  //           bullet.x < monster.x + 20 &&
  //           bullet.x + 5 > monster.x &&
  //           bullet.y < monster.y + 20 &&
  //           bullet.y + 10 > monster.y
  //         ) {
  //           // Bullet hit a monster, mark the monster as not alive
  //           hitMonster = true;
  //           break;
  //         }
  //       }
  //       return !hitMonster;
  //     });

  //     setMonsters(updatedMonsters);
  //     setBullets(updatedBullets);
  //   };

  //   const updateGame = () => {
  //     if (!gameOver && !gameWon) {
  //       // Update bullet positions
  //       const updatedBullets = bullets.map((bullet) => ({
  //         ...bullet,
  //         y: bullet.y - 10, // Adjust bullet speed
  //       }));

  //       // Check for collisions
  //       checkCollisions();

  //       // Remove bullets that are out of bounds
  //       const filteredBullets = updatedBullets.filter((bullet) => bullet.y > 0);

  //       // Move monsters down
  //       const updatedMonsters = monsters.map((monster) => ({
  //         ...monster,
  //         y: monster.y + 2, // Adjust monster speed
  //       }));

  //       setBullets(filteredBullets);
  //       setMonsters(updatedMonsters);

  //       // Check if all monsters are killed
  //       const allMonstersKilled = updatedMonsters.every(
  //         (monster) => !monster.alive
  //       );
  //       if (allMonstersKilled) {
  //         setGameWon(true);
  //       }

  //       // Check if monsters reach the bottom or if a monster bullet hits the player
  //       for (const monster of updatedMonsters) {
  //         if (
  //           monster.alive &&
  //           monster.y + 20 >= player.y &&
  //           monster.x >= player.x &&
  //           monster.x <= player.x + 20
  //         ) {
  //           setGameOver(true);
  //           break;
  //         }
  //       }
  //     }
  //   };

  //   useEffect(() => {
  //     window.addEventListener("keydown", handleKeyPress);

  //     const gameInterval = setInterval(updateGame, 100);

  //     return () => {
  //       window.removeEventListener("keydown", handleKeyPress);
  //       clearInterval(gameInterval);
  //     };
  //   }, [player, bullets, monsters, gameOver, gameWon]);

  //   return (
  //     <div className="flex flex-col items-center justify-center h-screen">
  //       {gameOver ? (
  //         <h1 className="text-4xl font-bold text-red-500">Game Over</h1>
  //       ) : gameWon ? (
  //         <h1 className="text-4xl font-bold text-green-500">You Won!</h1>
  //       ) : (
  //         <div className="relative">
  //           <div
  //             style={{ left: `${player.x}px`, top: `${player.y}px` }}
  //             className="absolute w-20 h-20 bg-blue-500"
  //           >
  //             Player
  //           </div>
  //           {bullets.map((bullet) => (
  //             <div
  //               key={bullet.id}
  //               style={{ left: `${bullet.x}px`, top: `${bullet.y}px` }}
  //               className="absolute w-5 h-10 bg-yellow-500"
  //             >
  //               Bullet
  //             </div>
  //           ))}
  //           {monsters
  //             .filter((monster) => monster.alive) // Filter out monsters that are not alive
  //             .map((monster) => (
  //               <div
  //                 key={monster.id}
  //                 style={{ left: `${monster.x}px`, top: `${monster.y}px` }}
  //                 className="absolute w-20 h-20 bg-red-500"
  //               >
  //                 Monster
  //               </div>
  //             ))}
  //         </div>
  //       )}
  //     </div>
  //   );

  return (
    <div className="flex flex-col items-center justify-center">
      To Be Implemented!
    </div>
  );
};

export default SpaceInvaders;
