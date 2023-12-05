"use client";
import React, { useEffect, useRef, useState } from "react";

const Breakout = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);
  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gameStart) return;
    const context = canvas.getContext("2d");
    let animationFrameId;

    // Game variables
    let paddle = {
      x: canvas.width / 2,
      y: canvas.height - 30,
      width: 75,
      height: 10,
      dx: 0,
    };
    let ball = {
      x: canvas.width / 2,
      y: canvas.height - 40,
      dx: 2,
      dy: -2,
      radius: 10,
    };
    let bricks = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        bricks.push({
          x: i * (75 + 10),
          y: j * (20 + 10),
          width: 75,
          height: 20,
        });
      }
    }

    // Game functions
    const drawBall = () => {
      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();

      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Bounce off the walls
      if (
        ball.x + ball.dx > canvas.width - ball.radius ||
        ball.x + ball.dx < ball.radius
      ) {
        ball.dx = -ball.dx;
      }
      if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
      }
      // Bounce off the paddle
      else if (ball.y + ball.dy > paddle.y) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
          ball.dy = -ball.dy;
        } else if (ball.y + ball.dy > canvas.height - ball.radius) {
          setGameOver(true);
        }
      }
    };

    const drawPaddle = () => {
      context.beginPath();
      context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
      context.fillStyle = "#0095DD";
      context.fill();
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
        context.fillStyle = "#0095DD";
        context.fill();
        context.closePath();
      });
    };

    const updateScore = () => {
      bricks.forEach((brick, index) => {
        if (
          ball.x > brick.x &&
          ball.x < brick.x + brick.width &&
          ball.y > brick.y &&
          ball.y < brick.y + brick.height
        ) {
          ball.dy = -ball.dy;
          bricks.splice(index, 1);
          setScore((score) => score + 1);
        }
      });

      if (bricks.length === 0) {
        setGameOver(true);
      }
    };

    const movePaddle = (event) => {
      if (event.key === "ArrowLeft") {
        paddle.dx = -2;
      } else if (event.key === "ArrowRight") {
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
        y: canvas.height - 30,
        width: 75,
        height: 10,
        dx: 2,
      };
      ball = {
        x: canvas.width / 2,
        y: canvas.height - 40,
        dx: 2,
        dy: -2,
        radius: 10,
      };
      bricks = [];
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 3; j++) {
          bricks.push({
            x: i * (75 + 10),
            y: j * (20 + 10),
            width: 75,
            height: 20,
          });
        }
      }
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
    window.addEventListener("keydown", movePaddle);
    window.addEventListener("keyup", movePaddle);

    return () => {
      window.removeEventListener("keydown", movePaddle);
      window.removeEventListener("keyup", movePaddle);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameOver, gameStart]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {!gameOver && gameStart && (
        <canvas
          ref={canvasRef}
          className="h-full w-full border-2 border-slate-500"
        />
      )}
      {gameOver && !gameStart && (
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
