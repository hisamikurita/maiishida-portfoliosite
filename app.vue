<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "./vendor/ScrollSmoother";

// クライアントサイドのビルドの時のみ実行
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  ScrollSmoother.create({
    smooth: 1.2,
  });
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
