<script setup>
const refCanvas = ref();

onMounted(() => {
  const canvas = refCanvas.value;
  console.log(canvas);
  const ctx = canvas.getContext("2d") || null;
  const dpr = window.devicePixelRatio || 1.0;
  const ball = { x: 20, y: 20 };
  let xunits = 0;
  let yunits = 0;
  let angle = 35;
  let radians = 0;
  let speed = 5;

  const updateBall = () => {
    radians = (angle * Math.PI) / 180;
    xunits = Math.cos(radians) * speed;
    yunits = Math.sin(radians) * speed;
  };
  updateBall();

  const drawScreen = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.x += xunits;
    ball.y += yunits;

    ctx.fillStyle = "#f21a68";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 15, 0, Math.PI * 2, true);
    ctx.fill();

    if (ball.x > canvas.width || ball.x < 0) {
      angle = 180 - angle;
      updateBall();
    } else if (ball.y > canvas.height || ball.y < 0) {
      angle = 360 - angle;
      updateBall();
    }
  };
  setInterval(drawScreen, 33);
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
