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
  let tempBall = null;
  let tempX = 0;
  let tempY = 0;
  let tempAngle = 35;
  let tempRadians = 0;
  let tempSpeed = 0.3;
  let tempVelocityX = 0;
  let tempVelocityY = 0;

  const setCanvasSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  };

  const hitTestCircle = (ball1, ball2) => {
    let retval = false;
    let dx = ball1.nextX - ball2.nextX;
    let dy = ball1.nextY - ball2.nextY;
    let distance = dx * dx + dy * dy;

    if (
      distance <=
      (ball1.radius + ball2.radius) * (ball1.radius + ball2.radius)
    ) {
      retval = true;
    }
    return retval;
  };

  const canStarHere = (ball) => {
    let retval = true;
    for (let i = 0; i < balls.length; i++) {
      if (hitTestCircle(ball, balls[i])) {
        retval = false;
      }
    }
    return retval;
  };

  const createParticle = () => {
    for (let i = 0; i < numBalls; i++) {
      let placeOK = false;
      while (!placeOK) {
        tempX = Math.floor(Math.random() * canvas.width);
        tempY = Math.floor(Math.random() * canvas.height);
        tempSpeed = Math.random() * 0.3 + tempSpeed;
        tempAngle = Math.floor(Math.random() * 360);
        tempRadians = (tempAngle * Math.PI) / 180;
        tempVelocityX = Math.cos(tempRadians) * tempSpeed;
        tempVelocityY = Math.sin(tempRadians) * tempSpeed;

        tempBall = {
          x: tempX,
          y: tempY,
          nextX: tempX,
          nextY: tempY,
          velocityX: tempVelocityX,
          velocityY: tempVelocityY,
          radius: size,
          speed: tempSpeed,
          angle: tempAngle,
          mass: size,
        };
        placeOK = canStarHere(tempBall);
      }
      balls.push(tempBall);
    }
  };

  const init = () => {
    setCanvasSize();
    createParticle();
    console.log(balls);
  };

  const update = () => {
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];
      ball.nextX = ball.x + ball.velocityX;
      ball.nextY = ball.y + ball.velocityY;
    }
  };

  const testWalls = () => {
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];

      if (ball.x + ball.radius > canvas.width) {
        ball.velocityX = ball.velocityX * -1.0;
        ball.nextX = canvas.width - ball.radius;
      } else if (ball.nextX - ball.radius < 0) {
        ball.velocityX = ball.velocityX * -1.0;
        ball.nextX = ball.radius;
      } else if (ball.nextY + ball.radius > canvas.height) {
        ball.velocityY = ball.velocityY * -1.0;
        ball.nextY = canvas.height - ball.radius;
      } else if (ball.nextY - ball.radius < 0) {
        ball.velocityY = ball.velocityY * -1.0;
        ball.nextY = ball.radius;
      }
    }
  };

  const collideBalls = (ball1, ball2) => {
    const dx = ball1.nextX - ball2.nextX;
    const dy = ball1.nextY - ball2.nextY;
    const collisionAngle = Math.atan2(dy, dx);
    const speed1 = Math.sqrt(
      ball1.velocityX * ball1.velocityX + ball1.velocityY * ball1.velocityY
    );
    const speed2 = Math.sqrt(
      ball2.velocityX * ball2.velocityX + ball2.velocityY * ball2.velocityY
    );
    const direction1 = Math.atan2(ball1.velocityY, ball1.velocityX);
    const direction2 = Math.atan2(ball2.velocityY, ball2.velocityX);
    const velocityX1 = speed1 * Math.cos(direction1 - collisionAngle);
    const velocityY1 = speed1 * Math.sin(direction1 - collisionAngle);
    const velocityX2 = speed2 * Math.cos(direction2 - collisionAngle);
    const velocityY2 = speed2 * Math.sin(direction2 - collisionAngle);
    const finalVelocityX1 =
      ((ball1.mass - ball2.mass) * velocityX1 +
        (ball2.mass + ball2.mass) * velocityX2) /
      (ball1.mass + ball2.mass);
    const finalVelocityX2 =
      ((ball1.mass + ball1.mass) * velocityX1 +
        (ball2.mass - ball1.mass) * velocityX2) /
      (ball1.mass + ball2.mass);
    const finalVelocityY1 = velocityY1;
    const finalVelocityY2 = velocityY2;

    ball1.velocityX =
      Math.cos(collisionAngle) * finalVelocityX1 +
      Math.cos(collisionAngle + Math.PI / 2) * finalVelocityY1;
    ball1.velocityY =
      Math.sin(collisionAngle) * finalVelocityX1 +
      Math.sin(collisionAngle + Math.PI / 2) * finalVelocityY1;
    ball2.velocityX =
      Math.cos(collisionAngle) * finalVelocityX2 +
      Math.cos(collisionAngle + Math.PI / 2) * finalVelocityY2;
    ball2.velocityY =
      Math.sin(collisionAngle) * finalVelocityX2 +
      Math.sin(collisionAngle + Math.PI / 2) * finalVelocityY2;

    ball1.nextX = ball1.nextX += ball1.velocityX;
    ball1.nextY = ball1.nextY += ball1.velocityY;
    ball2.nextX = ball2.nextX += ball2.velocityX;
    ball2.nextY = ball2.nextY += ball2.velocityY;
  };

  const collide = () => {
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];
      for (let j = i + 1; j < balls.length; j++) {
        const testBall = balls[j];
        if (hitTestCircle(ball, testBall)) {
          collideBalls(ball, testBall);
        }
      }
    }
  };

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];
      ball.x = ball.nextX;
      ball.y = ball.nextY;

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
      ctx.fillStyle = "#00daa1";
      ctx.fill();
    }
  };

  const draw = () => {
    update();
    testWalls();
    collide();
    render();
  };

  init();

  gsap.ticker.add(draw);
  window.addEventListener("resize", setCanvasSize);
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
