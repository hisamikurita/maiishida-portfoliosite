<script setup>
const projectData = useNuxtApp().$projectData;
</script>

<template>
  <div class="index">
    <!-- mv section -->
    <section class="mv">
      <div class="mv-bg">
        <div class="mv-container">
          <h1 class="mv-title">
            <span class="mv-title-wrapper-01">
              <nuxt-icon name="asterisk" filled class="mv-title-asterisk" />
              THIS IS
              <span class="mv-title-border">MY PORTFOLIO</span> SITE.<br />
            </span>
            I'M SO GLAD YOU CAME.<br />
            MY WORK IS WEBDESINER<br />
            WOOOOOOOOOOOOORKING FROM<br />
            2020 → 2023
          </h1>
          <p>あいうえお</p>
        </div>
      </div>
      <div class="mv-canvas">
        <AppParticle />
      </div>
    </section>
    <!-- pickup section -->
    <section class="pickup">
      <div class="pickup-bg">
        <div class="pickup-container">
          <h2 class="pickup-title">PICKUP WORKS</h2>
          <div class="pickup-inner">
            <div class="pickup-nav">
              <p class="pickup-nav-title">PICKUP CONTENT</p>
              <ul class="pickup-nav-list">
                <li
                  v-for="(data, index) in projectData"
                  class="pickup-nav-item"
                >
                  <p class="pickup-nav-text">
                    <span class="pickup-nav-text-num">0{{ index + 1.0 }}</span>
                    / {{ data.title }}
                  </p>
                </li>
              </ul>
            </div>
            <ul class="pickup-list">
              <li v-for="(data, index) in projectData" class="pickup-item">
                <NuxtLink to="#" class="pickup-link">
                  <div>
                    <span>0{{ index + 1.0 }}</span>
                    <h2 class="pickup-item-title">{{ data.title }}</h2>
                  </div>
                  <p>{{ data.company }}</p>
                  <p>{{ data.genre }}</p>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!-- project section -->
    <section class="project"></section>
    <!-- about section -->
    <section class="about">
      <div class="about-canvas">
        <AppParticle />
      </div>
    </section>
    <!-- contact section -->
    <section class="contact"></section>
  </div>
</template>

<style lang="scss" scoped>
//
// mv section
//
.mv {
  position: relative;
}
.mv-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.mv-bg {
  position: relative;
  height: 100vh;
  padding: 94px 0 0 0;
  background-color: $color-gray;
  mix-blend-mode: difference;
  z-index: 1;
}
.mv-container {
  padding: 0 vw(12);
}

.mv-title {
  position: relative;
  font-size: vw(100);
  line-height: 0.96;
  white-space: nowrap;
}

.mv-title-wrapper-01 {
  display: flex;
  align-items: center;
}

.mv-title-asterisk {
  display: flex;
  flex-shrink: 0;
  width: vw(81);
  height: vw(80);
  margin: 0 vw(6) 0 0;
}

.mv-title-border {
  display: block;
  position: relative;
  top: -6px;
  margin: 0 10px;
  color: $color-blue;
  letter-spacing: -0.01em;
  border-bottom: solid vw(6) $color-blue;
}

//
// pickup section
//
.pickup {
  position: relative;
}

.pickup-bg {
  padding: 200px 0;
  background-color: $color-gray;
}

.pickup-container {
  padding: 0 vw(12);
}

.pickup-inner {
  display: flex;
}

.pickup-nav {
  flex-shrink: 0;
  width: 190px;
  margin: 0 16px 0 0;
  padding: 30px 0 0 0;
  font-size: 12px;
  border-top: solid 1px $color-black;
}

.pickup-nav-title {
  margin: 0 0 20px 0;
}

.pickup-nav-item {
  &:not(:last-of-type) {
    margin: 0 0 10px 0;
  }
}

.pickup-list {
  width: 100%;
}

.pickup-item-title {
  font-size: 64px;
}

.pickup-item {
  border-top: solid 1px $color-black;

  &:last-of-type {
    border-bottom: solid 1px $color-black;
  }
}

.pickup-nav-text-num {
  color: $color-blue;
}

//
// project section
//
.project {
  height: 100vh;
  background-color: brown;
}

//
// about section
//
.about {
  position: relative;
  height: 100vh;
  background-color: cadetblue;
}

.about-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

//
// contact section
//
.contact {
  height: 100vh;
  background-color: aquamarine;
}
</style>
