<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "./vendor/ScrollSmoother";

// クライアントサイドのビルドの時のみ実行
if (typeof window !== "undefined") {
  gsap.ticker.fps(60);
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  ScrollSmoother.create({
    smooth: 1.2,
  });
}

// microcmsからデータを取得
const runtimeConfig = useRuntimeConfig();
const { data } = await useFetch("/project", {
  baseURL: runtimeConfig.public.serviceUrl,
  headers: { "X-MICROCMS-API-KEY": runtimeConfig.public.apiKey },
});
useNuxtApp().provide("projectData", data._rawValue.contents);
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
