"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { ScoresContext } from "@/app/contexts/Scores";

const GRID_SIZE = 20;
const TICK_INTERVAL = 150; // in milliseconds

const SnakeInstructions = () => (
  <div className="ml-4 flex space-x-4 text-left">
    <div className="p-2 rounded">
      <h2 className="text-lg font-bold mb-2 text-black dark:text-white">
        How to Play:
      </h2>
      <p className="text-sm text-black dark:text-white mb-2">
        Use arrow keys or WASD to control the snake.
      </p>
      <p className="text-sm text-black dark:text-white">
        Eat yellow squares to grow and avoid gray obstacles as well as the
        walls.
      </p>
    </div>

    <div className="p-2 rounded">
      <h2 className="text-lg font-bold mb-2 text-black dark:text-white">
        Point to Coin Conversion:
      </h2>
      <p className="text-sm text-black dark:text-white mb-2">
        1 point = 4 coins in Coop Guardian
      </p>
    </div>
  </div>
);

const SnakeGame = () => {
  const { setCoins, snakeScore, setSnakeScore } = useContext(ScoresContext);

  const generateRandomObstacle = () => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  };

  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [direction, setDirection] = useState("RIGHT");
  const [obstacles, setObstacles] = useState(
    Array.from({ length: 5 }, generateRandomObstacle)
  );

  const generateRandomFood = useCallback(() => {
    let newFoodPosition;
    do {
      newFoodPosition = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      obstacles.some(
        (obstacle) =>
          obstacle.x === newFoodPosition.x && obstacle.y === newFoodPosition.y
      ) ||
      snake.some(
        (segment) =>
          segment.x === newFoodPosition.x && segment.y === newFoodPosition.y
      )
    );
    return newFoodPosition;
  }, [obstacles, snake]);

  const [food, setFood] = useState(generateRandomFood());
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const canvasRef = useRef(null);

  const startGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    if (!gameStarted || gameOver) {
      return;
    }

    // Disable default behavior of arrow keys
    document.addEventListener("keydown", (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
    });

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
        clearInterval(tickInterval);
        return;
      }

      // Check if the new head position is on an obstacle
      if (
        obstacles.some(
          (obstacle) => obstacle.x === head.x && obstacle.y === head.y
        )
      ) {
        setGameOver(true);
        clearInterval(tickInterval);
        return;
      }

      // Check if the new head position collides with the snake's body
      if (
        snake
          .slice(1)
          .some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        clearInterval(tickInterval);
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
        setCoins((prevCoins) => prevCoins + 4);
        if (snakeScore < score + 1) {
          setSnakeScore(score + 1);
        }
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
      let newDirection;

      switch (e.key.toLowerCase()) {
        case "arrowup":
        case "w":
          newDirection = "UP";
          break;
        case "arrowdown":
        case "s":
          newDirection = "DOWN";
          break;
        case "arrowleft":
        case "a":
          newDirection = "LEFT";
          break;
        case "arrowright":
        case "d":
          newDirection = "RIGHT";
          break;
        default:
          break;
      }

      // Check if the new direction is not opposite to the current direction
      if (
        (newDirection === "UP" && direction !== "DOWN") ||
        (newDirection === "DOWN" && direction !== "UP") ||
        (newDirection === "LEFT" && direction !== "RIGHT") ||
        (newDirection === "RIGHT" && direction !== "LEFT")
      ) {
        setDirection(newDirection);
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
  }, [
    gameStarted,
    snake,
    direction,
    food,
    gameOver,
    obstacles,
    generateRandomFood,
    setCoins,
    score,
    snakeScore,
    setSnakeScore,
  ]);

  useEffect(() => {
    if (!gameStarted || gameOver) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Function Definitions
    const drawSnake = (ctx) => {
      const head = snake[0];

      // Draw head
      ctx.fillStyle = "darkgreen";
      ctx.fillRect(head.x * 20, head.y * 20, 20, 20);
      ctx.strokeStyle = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "#FFFFFF"
        : "#000000";
      ctx.strokeRect(head.x * 20, head.y * 20, 20, 20);

      // Draw body
      ctx.fillStyle = "green";
      ctx.strokeStyle = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "#FFFFFF"
        : "#000000";
      snake.slice(1).forEach((segment) => {
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
        ctx.strokeRect(segment.x * 20, segment.y * 20, 20, 20);
      });
    };

    const drawFood = (ctx) => {
      ctx.fillStyle = "yellow";
      ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
      ctx.strokeStyle = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "#FFFFFF"
        : "#000000";
      ctx.strokeRect(food.x * 20, food.y * 20, 20, 20);
    };

    const drawObstacles = (ctx) => {
      ctx.fillStyle = "gray";
      ctx.strokeStyle = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "#FFFFFF"
        : "#000000";
      obstacles.forEach((obstacle) => {
        ctx.fillRect(obstacle.x * 20, obstacle.y * 20, 20, 20);
        ctx.strokeRect(obstacle.x * 20, obstacle.y * 20, 20, 20);
      });
    };

    drawSnake(ctx);
    drawFood(ctx);
    drawObstacles(ctx);
  }, [gameStarted, snake, food, obstacles, gameOver]);

  const resetGame = () => {
    setSnake([{ x: 0, y: 0 }]);
    setDirection("RIGHT");
    setFood(generateRandomFood());
    setObstacles(Array.from({ length: 5 }, generateRandomObstacle));
    setGameOver(false);
    setGameStarted(true);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center h-full relative">
      <div className="flex">
        <div>
          <h1 className="text-4xl text-center text-black dark:text-white">
            Snake
          </h1>
          <SnakeInstructions />
          {!gameStarted && (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
              onClick={startGame}
            >
              Play Game
            </button>
          )}
          {gameStarted && !gameOver && (
            <div className="flex flex-col items-center justify-center flex-grow overflow-hidden">
              <p className="text-xl font-bold mb-2">Score: {score}</p>
              <canvas
                ref={canvasRef}
                width={GRID_SIZE * 20}
                height={GRID_SIZE * 20}
                className="border-2 border-black dark:border-white h-full w-full lg:w-2/3 lg:h-2/3"
              />
            </div>
          )}
          {gameOver && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-3xl font-bold mb-2 text-black dark:text-white">
                Game Over!
              </p>
              <p className="text-xl text-black mb-4 dark:text-white">
                Your final score is: {score}
              </p>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={resetGame}
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
