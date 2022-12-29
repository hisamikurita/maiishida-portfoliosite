<script setup>
import { gsap } from "gsap";

const refCanvas = ref();
const numParticles = 15;
const size = 20;
const particles = [];
let canvas = null;
let ctx = null;
let templateParticle = null;
let iObserver = null;

/**
 * canvasサイズの設定
 */
const setCanvasSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
};

/**
 * パーティクル同士の衝突判定
 */
const hitParticles = (particle1, particle2) => {
  let hit = false;
  // ピタゴラスの定理(A*2+B*2=C*2)からパーティクルの中心を結ぶ直線の距離を求める
  let dx = particle1.nextX - particle2.nextX;
  let dy = particle1.nextY - particle2.nextY;
  let distance = dx * dx + dy * dy;

  // パーティクルのパーティクルの中心間の距離の二乗とボールの半径の和の二乗を比較して、
  // 前者が後者よりも小さい値なら衝突していると判定できる
  if (
    distance <=
    (particle1.radius + particle2.radius) *
      (particle1.radius + particle2.radius)
  ) {
    hit = true;
  }
  return hit;
};

/**
 * 全てのパーティクルから、新たに生成したパーティクルと重ならないかチェックする
 */
const canParticlesPosition = (particle) => {
  let canParticlePosition = true;
  for (let i = 0; i < particles.length; i++) {
    if (hitParticles(particle, particles[i])) {
      canParticlePosition = false;
    }
  }
  return canParticlePosition;
};

/**
 * パーティクル生成
 */
const createParticles = () => {
  for (let i = 0; i < numParticles; i++) {
    let place = false;
    // パーティクルの最初の位置が重ならないように,whileループを作成する
    while (!place) {
      const x = Math.floor(Math.random() * canvas.width);
      const y = Math.floor(Math.random() * canvas.height);
      const speed = Math.random() * 0.7 + 0.7;
      const angle = Math.floor(Math.random() * 360);
      const radians = (angle * Math.PI) / 180;
      const vx = Math.cos(radians) * speed;
      const vy = Math.sin(radians) * speed;

      templateParticle = {
        x: x,
        y: y,
        nextX: x,
        nextY: y,
        velocityX: vx,
        velocityY: vy,
        radius: size,
        speed: speed,
        angle: angle,
        mass: size,
      };
      // canParticlesPositionがtrueを返したときにwhileループを抜ける
      place = canParticlesPosition(templateParticle);
    }
    particles.push(templateParticle);
  }
};

/**
 * 画面内に表示されている時だけ更新
 */
const observe = () => {
  iObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.ticker.add(drawParticles);
        } else {
          gsap.ticker.remove(drawParticles);
        }
      });
    },
    { rootMargin: "0%" }
  );
  iObserver.observe(canvas);
};

/**
 * パーティクルの次に進むXYの値を更新
 */
const update = () => {
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    particle.nextX = particle.x + particle.velocityX;
    particle.nextY = particle.y + particle.velocityY;
  }
};

/**
 * パーティクルとcanvasサイズの衝突判定
 */
const rebound = () => {
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];

    if (particle.x + particle.radius > canvas.width) {
      particle.velocityX = particle.velocityX * -1.0;
      particle.nextX = canvas.width - particle.radius;
    } else if (particle.nextX - particle.radius < 0) {
      particle.velocityX = particle.velocityX * -1.0;
      particle.nextX = particle.radius;
    } else if (particle.nextY + particle.radius > canvas.height) {
      particle.velocityY = particle.velocityY * -1.0;
      particle.nextY = canvas.height - particle.radius;
    } else if (particle.nextY - particle.radius < 0) {
      particle.velocityY = particle.velocityY * -1.0;
      particle.nextY = particle.radius;
    }
  }
};

/**
 * パーティクル同士の衝突処理
 */
const collisionParticlesDetection = (particle1, particle2) => {
  // 描画の後にパーティクルがどの位置にいるのかを比較するために、nextXYを比較する
  // ボールの中心座標から、衝突する時の角度を求める
  const dx = particle1.nextX - particle2.nextX;
  const dy = particle1.nextY - particle2.nextY;
  const collisionAngle = Math.atan2(dy, dx);
  // 衝突が起こる前のXYの速度を元に各ボールの速さを求める
  const speed1 = Math.sqrt(
    particle1.velocityX * particle1.velocityX +
      particle1.velocityY * particle1.velocityY
  );
  const speed2 = Math.sqrt(
    particle2.velocityX * particle2.velocityX +
      particle2.velocityY * particle2.velocityY
  );
  // 衝突が起こる前のXYの速度を元に各ボールの角度を求める
  const direction1 = Math.atan2(particle1.velocityY, particle1.velocityX);
  const direction2 = Math.atan2(particle2.velocityY, particle2.velocityX);
  // 運動量保存の法則を適用したいので、ベクトルを回転させる
  const velocityX1 = speed1 * Math.cos(direction1 - collisionAngle);
  const velocityY1 = speed1 * Math.sin(direction1 - collisionAngle);
  const velocityX2 = speed2 * Math.cos(direction2 - collisionAngle);
  const velocityY2 = speed2 * Math.sin(direction2 - collisionAngle);
  // 各ボールのmass値から運動量保存の法則に基づいて、XYの速度を更新
  const finalVelocityX1 =
    ((particle1.mass - particle2.mass) * velocityX1 +
      (particle2.mass + particle2.mass) * velocityX2) /
    (particle1.mass + particle2.mass);
  const finalVelocityX2 =
    ((particle1.mass + particle1.mass) * velocityX1 +
      (particle2.mass - particle1.mass) * velocityX2) /
    (particle1.mass + particle2.mass);
  // Xの速度だけ更新する
  const finalVelocityY1 = velocityY1;
  const finalVelocityY2 = velocityY2;
  // 速度が求められたので、衝突の角度が維持されるようにベクトルの回転を元に戻す
  particle1.velocityX =
    Math.cos(collisionAngle) * finalVelocityX1 +
    Math.cos(collisionAngle + Math.PI / 2) * finalVelocityY1;
  particle1.velocityY =
    Math.sin(collisionAngle) * finalVelocityX1 +
    Math.sin(collisionAngle + Math.PI / 2) * finalVelocityY1;
  particle2.velocityX =
    Math.cos(collisionAngle) * finalVelocityX2 +
    Math.cos(collisionAngle + Math.PI / 2) * finalVelocityY2;
  particle2.velocityY =
    Math.sin(collisionAngle) * finalVelocityX2 +
    Math.sin(collisionAngle + Math.PI / 2) * finalVelocityY2;
  // ここでnextXYの値を更新する
  particle1.nextX = particle1.nextX += particle1.velocityX;
  particle1.nextY = particle1.nextY += particle1.velocityY;
  particle2.nextX = particle2.nextX += particle2.velocityX;
  particle2.nextY = particle2.nextY += particle2.velocityY;
};

/**
 * パーティクル同士の衝突をチェックする
 */
const collide = () => {
  // 二重ループで各パーティクルと他のパーティクルがどれとも衝突しないかチェックする
  for (let i = 0; i < particles.length; i++) {
    const particle1 = particles[i];
    // 1をプラスすることで同じパーティクル同士では比較しない
    for (let j = i + 1; j < particles.length; j++) {
      const particle2 = particles[j];
      if (hitParticles(particle1, particle2)) {
        // 衝突したときにcollisionParticlesDetectionが呼び出される
        collisionParticlesDetection(particle1, particle2);
      }
    }
  }
};

/**
 * 描画
 */
const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    particle.x = particle.nextX;
    particle.y = particle.nextY;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = "#00daa1";
    ctx.fill();
  }
};

const drawParticles = () => {
  update();
  rebound();
  collide();
  render();
};

const init = () => {
  setCanvasSize();
  createParticles();
  observe();
  window.addEventListener("resize", setCanvasSize);
};

const destroy = () => {
  iObserver.unobserve(canvas);
  gsap.ticker.remove(drawParticles);
  window.removeEventListener("resize", setCanvasSize);
};

// Lifecycle Hooks

onMounted(() => {
  canvas = refCanvas.value;
  ctx = canvas.getContext("2d") || null;

  init();
});

onBeforeUnmount(() => {
  destroy();
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
