<script setup>
import { gsap } from "gsap";

const refCanvas = ref();

onMounted(() => {
  const canvas = refCanvas.value;
  const ctx = canvas.getContext("2d") || null;
  const dpr = window.devicePixelRatio || 1.0;
  const numBalls = 15;
  const size = 20;
  const balls = [];
  let tempX = 0;
  let tempY = 0;
  let tempUnitX = 0;
  let tempUnitY = 0;
  let tempAngle = 35;
  let tempRadians = 0;
  let tempSpeed = 0.3;

  const _setCanvasSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  };

  const init = () => {
    _setCanvasSize();
  };

  const updateBall = (ball) => {
    ball.radians = (ball.angle * Math.PI) / 180;
    ball.xunits = Math.cos(ball.radians) * ball.speed;
    ball.yunits = Math.sin(ball.radians) * ball.speed;
  };

  const drawScreen = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];
      ball.x += ball.xunits;
      ball.y += ball.yunits;

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 15, ball.radius, Math.PI * 2, true);
      ctx.fillStyle = "#00daa1";
      ctx.fill();

      if (ball.x > canvas.width || ball.x < 0) {
        ball.angle = 180 - ball.angle;
        updateBall(ball);
      } else if (ball.y > canvas.height || ball.y < 0) {
        ball.angle = 360 - ball.angle;
        updateBall(ball);
      }
    }
  };

  init();

  for (let i = 0; i < numBalls; i++) {
    tempX = Math.floor(Math.random() * canvas.width);
    tempY = Math.floor(Math.random() * canvas.height);
    tempSpeed = Math.random() * 0.3 + tempSpeed;
    tempAngle = Math.floor(Math.random() * 360);
    tempRadians = (tempAngle * Math.PI) / 180;
    tempUnitX = Math.cos(tempRadians) * tempSpeed;
    tempUnitY = Math.sin(tempRadians) * tempSpeed;

    balls.push({
      x: tempX,
      y: tempY,
      radius: size,
      speed: tempSpeed,
      angle: tempAngle,
      xunits: tempUnitX,
      yunits: tempUnitY,
    });
  }

  gsap.ticker.add(drawScreen);
  window.addEventListener("resize", _setCanvasSize);
});
</script>

<template>
  <canvas ref="refCanvas" class="canvas"></canvas>
</template>

<style lang="scss" scoped>
.canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
