"use client";
import { useState, useEffect, useRef } from "react";

const GRID_SIZE = 20;
const TICK_INTERVAL = 150; // in milliseconds

const SnakeGame = () => {
  const generateRandomFood = () => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  };

  const generateRandomObstacle = () => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  };

  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState(generateRandomFood());
  const [obstacles, setObstacles] = useState(
    Array.from({ length: 5 }, generateRandomObstacle)
  );
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const canvasRef = useRef(null);

  useEffect(() => {
    // Function Definitions
    const moveSnake = () => {
      const head = { ...snake[0] };

      switch (direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
        default:
          break;
      }

      // Check if the new head position is outside the boundaries
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return;
      }

      // Check if the new head position is on an obstacle
      if (
        obstacles.some(
          (obstacle) => obstacle.x === head.x && obstacle.y === head.y
        )
      ) {
        setGameOver(true);
        return;
      }

      // Check if the new head position collides with the snake's body
      if (
        snake
          .slice(1)
          .some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        return;
      }

      // Check if the new head position is on the food
      const ateFood = head.x === food.x && head.y === food.y;

      const newSnake = ateFood
        ? [{ x: food.x, y: food.y }, ...snake]
        : [head, ...snake.slice(0, -1)];
      setSnake(newSnake);

      if (ateFood) {
        setScore((prevScore) => prevScore + 1);
        setFood(generateRandomFood());
      }
    };

    const checkFood = () => {
      const head = snake[0];

      // Check if snake eats food
      if (head.x === food.x && head.y === food.y) {
        const newSnake = [{ x: food.x, y: food.y }, ...snake];
        setFood(generateRandomFood());
        setSnake(newSnake);
      }
    };

    // Event Listeners
    const handleKeyPress = (e) => {
      switch (e.key.toLowerCase()) {
        case "arrowup":
        case "w":
          setDirection("UP");
          break;
        case "arrowdown":
        case "s":
          setDirection("DOWN");
          break;
        case "arrowleft":
        case "a":
          setDirection("LEFT");
          break;
        case "arrowright":
        case "d":
          setDirection("RIGHT");
          break;
        default:
          break;
      }
    };

    const handleTick = () => {
      moveSnake();
      checkFood();
    };

    document.addEventListener("keydown", handleKeyPress);

    // Intervals
    const tickInterval = setInterval(handleTick, TICK_INTERVAL);

    // Clean-up
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      clearInterval(tickInterval);
    };
  }, [snake, direction, food, gameOver, obstacles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Function Definitions
    const drawSnake = (ctx) => {
      const head = snake[0];

      // Draw head
      ctx.fillStyle = "darkgreen";
      ctx.fillRect(head.x * 20, head.y * 20, 20, 20);

      // Draw body
      ctx.fillStyle = "green";
      snake.slice(1).forEach((segment) => {
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
      });
    };

    const drawFood = (ctx) => {
      ctx.fillStyle = "red";
      ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
    };

    const drawObstacles = (ctx) => {
      ctx.fillStyle = "gray";
      obstacles.forEach((obstacle) => {
        ctx.fillRect(obstacle.x * 20, obstacle.y * 20, 20, 20);
      });
    };

    drawSnake(ctx);
    drawFood(ctx);
    drawObstacles(ctx);
  }, [snake, food, obstacles, gameOver]);

  const resetGame = () => {
    setSnake([{ x: 0, y: 0 }]);
    setDirection("RIGHT");
    setFood(generateRandomFood());
    setObstacles(Array.from({ length: 5 }, generateRandomObstacle));
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center h-screen relative overflow-hidden">
      <h1 className="text-4xl text-center text-white">Snake</h1>
      <div className="flex flex-col ">
        <p className="text-xl font-bold mb-2">Score: {score}</p>
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * 20}
          height={GRID_SIZE * 20}
          className="border-2 border-black"
        />
        {gameOver && (
          <div className="relative pt-20 w-full h-full flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg text-center">
              <p className="text-3xl font-bold mb-2 text-black">Game Over!</p>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={resetGame}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;
