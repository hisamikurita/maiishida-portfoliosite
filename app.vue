<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "./vendor/ScrollSmoother";

/**
 * 慣性スクロール
 */
// クライアントサイドのビルドの時のみ実行
if (typeof window !== "undefined") {
  gsap.ticker.fps(60);
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  ScrollSmoother.create({
    smooth: 1.2,
  });
}

/**
 * microcmsからデータを取得
 */
const runtimeConfig = useRuntimeConfig();
const { data } = await useFetch("/project", {
  baseURL: runtimeConfig.serviceUrl,
  headers: { "X-MICROCMS-API-KEY": runtimeConfig.apiKey },
});
useNuxtApp().provide("projectData", data._rawValue.contents);

/**
 * ウィンドウサイズを取得
 */
const initWidth = () => {
  const vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty("--vw", `${vw}px`);
};
const initHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
const setViewportWidth = () => {
  initWidth();
};
const setViewportHeight = () => {
  initHeight();
};
// クライアントサイドのビルドの時のみ実行
if (typeof window !== "undefined") {
  setViewportWidth();
  setViewportHeight();
  window.addEventListener("resize", setViewportWidth);
  window.addEventListener("resize", setViewportHeight);
}
</script>

<template>
  <NuxtLayout>
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <NuxtPage />
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
#smooth-content {
  will-change: transform;
}
</style>
