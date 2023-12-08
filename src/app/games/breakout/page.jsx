"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import { ScoresContext } from "@/app/contexts/Scores";

const Breakout = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const { setCoins, breakoutScore, setBreakoutScore } =
    useContext(ScoresContext);

  useEffect(() => {
    if (score > 0 && !gameOver && gameStart) {
      // setCoins((prevCoins) => prevCoins + 2);
      if (score > breakoutScore) {
        setBreakoutScore(score);
      }
    }
  }, [score, setCoins, breakoutScore, setBreakoutScore, gameStart, gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gameStart) return;
    const context = canvas.getContext("2d");
    let animationFrameId;

    // Game variables
    let paddle = {
      x: canvas.width / 2,
      y: canvas.height - 20,
      width: 50,
      height: 1,
      dx: 0,
    };
    let ball = {
      // Randomize the ball's starting position
      x: Math.floor(Math.random() * (canvas.width - 20)) + 20,
      y: canvas.height - 40,
      dx: Math.random() < 0.5 ? 1 : -1, // Randomize the ball's starting velocity
      dy: -1,
      radius: 5,
    };
    let bricks = [];
    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 5; j++) {
        bricks.push({
          x: i * (23 + 4) + 4,
          y: j * (5 + 2) + 1,
          width: 23,
          height: 5,
          color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)})`,
        });
      }
    }

    // Game functions
    const drawBall = () => {
      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      // Color is black if dark mode is enabled, white otherwise
      context.fillStyle = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "#FFFFFF"
        : "#000000";
      context.fill();
      context.closePath();

      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Bounce off the walls
      if (
        // Bounce off the left and right walls
        ball.x + ball.dx > canvas.width - ball.radius ||
        ball.x + ball.dx < ball.radius
      ) {
        ball.dx = -ball.dx;
      }
      // Bounce off the top wall
      if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
      }
      // Bounce off the paddle
      else if (
        ball.y + ball.dy > paddle.y - ball.radius &&
        ball.y + ball.dy < paddle.y + paddle.height &&
        ball.x + ball.dx > paddle.x &&
        ball.x + ball.dx < paddle.x + paddle.width
      ) {
        // Update the ball's horizontal velocity by adding the paddle's horizontal velocity,
        // but make sure the ball doesn't go faster than 2.5
        ball.dy = -ball.dy;
        ball.dx += paddle.dx;
        if (ball.dx > 2.5) {
          ball.dx = 2.5;
        } else if (ball.dx < -2.5) {
          ball.dx = -2.5;
        }
      }
      // Ball is below the paddle
      if (ball.y + ball.dy > canvas.height - ball.radius) {
        setGameOver(true);
      }
    };

    const drawPaddle = () => {
      context.beginPath();
      context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
      // Color is white if dark mode is enabled, dark otherwise
      context.strokeStyle = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "#FFFFFF"
        : "#000000";
      context.lineWidth = 1;
      context.stroke();
      context.closePath();
      if (
        paddle.x + paddle.dx > 0 &&
        paddle.x + paddle.dx < canvas.width - paddle.width
      ) {
        paddle.x += paddle.dx;
      }
    };

    const drawBricks = () => {
      bricks.forEach((brick) => {
        context.beginPath();
        context.rect(brick.x, brick.y, brick.width, brick.height);
        context.fillStyle = brick.color;
        context.fill();
        context.closePath();
      });
    };

    const updateScore = async () => {
      bricks.forEach((brick, index) => {
        const prevBallX = ball.x - ball.dx;
        const prevBallY = ball.y - ball.dy;
        const hitTopOrBottom =
          prevBallY < brick.y || prevBallY > brick.y + brick.height;
        const hitSide =
          prevBallX < brick.x || prevBallX > brick.x + brick.width;

        if (
          ball.y + ball.dy > brick.y &&
          ball.y + ball.dy < brick.y + brick.height &&
          ball.x + ball.dx > brick.x &&
          ball.x + ball.dx < brick.x + brick.width
        ) {
          if (hitTopOrBottom) {
            // Ball hits the top or bottom of the brick
            ball.dy = -ball.dy;
          } else if (hitSide) {
            // Ball hits the side of the brick
            ball.dx = -ball.dx;
          }
          bricks.splice(index, 1);
          setScore((prevScore) => prevScore + 1);
          setCoins((prevCoins) => prevCoins + 4);
        }
      });

      if (bricks.length === 0) {
        setBreakoutScore(55);
        setGameOver(true);
      }
    };

    const movePaddle = (event) => {
      if (event.key === "ArrowLeft" || event.key === "a") {
        paddle.dx = -2;
      } else if (event.key === "ArrowRight" || event.key === "d") {
        paddle.dx = 2;
      } else {
        paddle.dx = 0;
      }

      if (event.type === "keyup") {
        paddle.dx = 0;
      }
    };

    const resetGame = async () => {
      paddle = {
        x: canvas.width / 2,
        y: canvas.height - 20,
        dx: 0,
      };
      ball = {
        // Randomize the ball's starting position
        x: Math.floor(Math.random() * (canvas.width - 20)) + 20,
        y: canvas.height - 40,
      };
    };

    // Game loop
    const gameLoop = async () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddle();
      drawBricks();
      updateScore();
      if (gameOver) {
        cancelAnimationFrame(animationFrameId);
        await resetGame();
      }
      animationFrameId = requestAnimationFrame(gameLoop);
    };
    animationFrameId = requestAnimationFrame(gameLoop);

    // Event listeners
    // Prevent default scrolling behavior when the arrow keys are pressed
    window.addEventListener("keydown", (event) => {
      event.preventDefault();
    });

    window.addEventListener("keydown", movePaddle);
    window.addEventListener("keyup", movePaddle);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameOver, gameStart, setCoins, setBreakoutScore]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-4xl font-bold mb-4">Breakout</h2>
      <div className="ml-4 flex space-x-4">
        <div className="text-left p-2 rounded">
          <h2 className="text-lg font-bold mb-2 text-black dark:text-white">
            How to Play:
          </h2>
          <p className="text-sm text-black dark:text-white mb-2">
            Use the left and right arrow keys or A and D keys to move the
            paddle.
          </p>
          <p className="text-sm text-black dark:text-white mb-2">
            Do not let the ball fall below the paddle or else Game Over.
          </p>
          <p className="text-sm text-black dark:text-white mb-2">
            Hit the ball with the paddle to break the bricks.
          </p>
          <p className="text-sm text-black dark:text-white mb-2">
            Break all the bricks to win.
          </p>
        </div>

        <div className="text-left p-2 rounded">
          <h2 className="text-lg font-bold mb-2 text-black dark:text-white">
            Point to Coin Conversion:
          </h2>
          <p className="text-sm text-black dark:text-white mb-2">
            1 point = 4 coins in Coop Guardian
          </p>
        </div>
      </div>

      {!gameOver && gameStart && (
        <canvas
          ref={canvasRef}
          className="h-full w-full border-4 border-slate-500 dark:border-slate-400 rounded"
        />
      )}
      {!gameOver && !gameStart && (
        <button
          className="p-2 mt-4 bg-blue-500 text-white rounded"
          onClick={() => {
            setGameStart(true);
            setGameOver(false);
          }}
        >
          Play Game
        </button>
      )}
      {gameOver && gameStart && (
        <button
          className="p-2 mt-4 bg-blue-500 text-white rounded"
          onClick={() => {
            setGameOver(false);
            setScore(0);
          }}
        >
          Play Again
        </button>
      )}
      <p className="mt-4">Score: {score}</p>
    </div>
  );
};

export default Breakout;
