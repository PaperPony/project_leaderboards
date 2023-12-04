"use client";
import React, { useState, useEffect } from "react";

const Snake = () => {
  // const [snake, setSnake] = useState([{ x: 1, y: 1 }]);
  // const [food, setFood] = useState({ x: 1, y: 1 });
  // const [direction, setDirection] = useState('RIGHT');
  // const [score, setScore] = useState(0);
  // const [gameOver, setGameOver] = useState(false);
  // const [obstacles, setObstacles] = useState([]);
  // const [gridSize, setGridSize] = useState(15);

  // useEffect(() => {
  //   const initialObstacles = Array.from({ length: 3 }).map(() => {
  //     const x = Math.floor(Math.random() * (gridSize - 2));
  //     const y = Math.floor(Math.random() * (gridSize - 2));
  //     const isVertical = Math.random() < 0.5;

  //     return isVertical
  //       ? [{ x, y }, { x, y: y + 1 }, { x, y: y + 2 }]
  //       : [{ x, y }, { x: x + 1, y }, { x: x + 2, y }];
  //   }).flat();

  //   const borderObstacles = Array.from({ length: gridSize }).flatMap((_, i) => [
  //     { x: i, y: 0 },
  //     { x: i, y: gridSize - 1 },
  //     { x: 0, y: i },
  //     { x: gridSize - 1, y: i },
  //   ]);

  //   setObstacles([...initialObstacles, ...borderObstacles]);
  //   setFood(generateFoodCoordinates());
  // }, [gridSize]);

  // useEffect(() => {
  //   if (gameOver) return;

  //   const interval = setInterval(() => {
  //     moveSnake();
  //   }, 200);

  //   window.addEventListener('keydown', updateDirection);

  //   return () => {
  //     clearInterval(interval);
  //     window.removeEventListener('keydown', updateDirection);
  //   };
  // }, [snake, direction, food, score, gameOver]);

  // useEffect(() => {
  //   setGridSize(Math.max(15, Math.ceil(snake.length / 2) * 2 + 1));
  // }, [snake]);

  // const updateDirection = (event) => {
  //   switch (event.key) {
  //     case 'ArrowUp':
  //     case 'w':
  //     case 'W':
  //       setDirection('UP');
  //       break;
  //     case 'ArrowDown':
  //     case 's':
  //     case 'S':
  //       setDirection('DOWN');
  //       break;
  //     case 'ArrowLeft':
  //     case 'a':
  //     case 'A':
  //       setDirection('LEFT');
  //       break;
  //     case 'ArrowRight':
  //     case 'd':
  //     case 'D':
  //       setDirection('RIGHT');
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const moveSnake = () => {
  //   if (gameOver) return;

  //   const newSnake = snake.map((s) => ({ ...s }));
  //   const head = { ...newSnake[0] };

  //   switch (direction) {
  //     case 'UP':
  //       head.y -= 1;
  //       break;
  //     case 'DOWN':
  //       head.y += 1;
  //       break;
  //     case 'LEFT':
  //       head.x -= 1;
  //       break;
  //     case 'RIGHT':
  //       head.x += 1;
  //       break;
  //     default:
  //       break;
  //   }

  //   if (
  //     head.x < 0 ||
  //     head.y < 0 ||
  //     head.x >= gridSize ||
  //     head.y >= gridSize ||
  //     obstacles.some((obstacle) => obstacle.x === head.x && obstacle.y === head.y) ||
  //     newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
  //   ) {
  //     endGame();
  //     return;
  //   }

  //   newSnake.unshift(head);

  //   if (head.x === food.x && head.y === food.y) {
  //     setFood(generateFoodCoordinates());
  //     setScore((prevScore) => prevScore + 1);
  //   } else {
  //     newSnake.pop();
  //   }

  //   setSnake(newSnake);
  // };

  // const endGame = () => {
  //   setGameOver(true);
  // };

  // const restartGame = () => {
  //   setSnake([{ x: 1, y: 1 }]);
  //   setFood(generateFoodCoordinates());
  //   setDirection('RIGHT');
  //   setScore(0);
  //   setGameOver(false);
  // };

  // function generateFoodCoordinates() {
  //   let newFood;
  //   do {
  //     newFood = {
  //       x: Math.floor(Math.random() * gridSize),
  //       y: Math.floor(Math.random() * gridSize),
  //     };
  //   } while (
  //     obstacles.some((obstacle) => obstacle.x === newFood.x && obstacle.y === newFood.y) ||
  //     snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
  //   );
  //   return newFood;
  // }

  // return (
  //   <div className="text-4xl font-bold mb-4">
  //     Snake
  //     <div className="text-xl font-bold mb-2">Score: {score}</div>
  //     <div className="relative flex flex-col items-center justify-center bg-gray-800 text-white">
  //       {gameOver && (
  //         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center game-over">
  //           <h1 className="text-4xl font-bold mb-4">Game Over!</h1>
  //           <p className="text-lg mb-8">Your score: {score}</p>
  //           <button
  //             className="bg-blue-500 text-white px-4 py-2 rounded-md restart-button"
  //             onClick={restartGame}
  //           >
  //             Restart Game
  //           </button>
  //         </div>
  //       )}
  //       <div
  //         className={`grid grid-cols-${gridSize} gap-1`}
  //         style={{
  //           maxWidth: `${gridSize * 5 + (gridSize - 1)}rem`, // Adjusted width based on grid size
  //         }}
  //       >
  //         {Array.from({ length: gridSize * gridSize }).map((_, index) => (
  //           <div
  //             key={index}
  //             className="w-5 h-5 bg-gray-700 border border-gray-800"
  //           />
  //         ))}
  //         {obstacles.map((obstacle, index) => (
  //           <div
  //             key={index}
  //             className="w-5 h-5 bg-red-800 border border-gray-800 obstacle"
  //             style={{
  //               gridColumn: obstacle.x + 1,
  //               gridRow: obstacle.y + 1,
  //             }}
  //           />
  //         ))}
  //         {snake.map((segment, index) => (
  //           <div
  //             key={index}
  //             className="w-5 h-5 bg-green-500 border border-gray-800 snake-segment"
  //             style={{
  //               gridColumn: segment.x + 1,
  //               gridRow: segment.y + 1,
  //             }}
  //           />
  //         ))}
  //         <div
  //           className="w-5 h-5 bg-red-500 border border-gray-800 food"
  //           style={{
  //             gridColumn: food.x + 1,
  //             gridRow: food.y + 1,
  //           }}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex flex-col items-center justify-center">
      To Be Implemented!
    </div>
  );
};

export default Snake;
