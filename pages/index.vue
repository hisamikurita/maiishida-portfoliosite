<script setup>
const projectData = useNuxtApp().$projectData;
// console.log(projectData);
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
                    / {{ data.title.main }}
                  </p>
                </li>
              </ul>
            </div>
            <ul class="pickup-list">
              <li v-for="(data, index) in projectData" class="pickup-item">
                <NuxtLink :to="`/works/${data.id}`" class="pickup-link">
                  <div class="pickup-item-title-area">
                    <span class="pickup-item-title-num"
                      >0{{ index + 1.0 }}</span
                    >
                    <h3 class="pickup-item-title">{{ data.title.main }}</h3>
                  </div>
                  <p class="pickup-item-company">{{ data.client }}</p>
                  <p class="pickup-item-genre">{{ data.type }}</p>
                  <nuxt-icon name="arrow" filled class="pickup-item-arrow" />
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!-- project section -->
    <section class="project">
      <ul>
        <li v-for="(data, index) in projectData">
          <AppCardFullScreenTicket :project="data" :index="index" />
        </li>
      </ul>
    </section>
    <!-- about section -->
    <section class="about">
      <div class="about-bg">
        <div class="about-border">
          <h2>ABOUT ME</h2>
          <div class="about-list">
            <div class="about-img-01">
              <nuxt-img
                src="/images/about-img-01.jpg"
                alt=""
                quality="80"
                format="webp"
              />
            </div>
            <div class="about-img-02">
              <nuxt-img
                src="/images/about-img-02.jpg"
                alt=""
                quality="80"
                format="webp"
              />
            </div>
            <div>
              <p>PROFILE</p>
              <div>
                <p>NAME</p>
                <p>MAI ISHIDA</p>
              </div>
              <p>
                自分だけの色(フロンティア)を見つけよう。<br />
                大人になっても輝かしい青春を送ることができる。<br />
                そんなイメージを表現したフロンティア様のリクルートサイトです。
              </p>
            </div>
          </div>
          <div class="about-loop-text">
            <AppLoopText loop-text="MAI ISHIDA" />
          </div>
        </div>
      </div>
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
  z-index: 1;
  // mix-blend-mode: difference;
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
  color: $color-blue;
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

.pickup-nav-text-num {
  color: $color-blue;
}

.pickup-list {
  width: 100%;
}

.pickup-item {
  position: relative;
  border-top: solid 1px $color-black;

  &:last-of-type {
    border-bottom: solid 1px $color-black;
  }
}

.pickup-link {
  display: block;
  width: 100%;
  height: 100%;
  padding: 28px 0;
}

.pickup-item-title-area {
  display: flex;
}

.pickup-item-title-num {
  margin: 0 30px 0 0;
  font-size: 15px;
}
.pickup-item-title {
  position: relative;
  top: -6px;
  margin: 0 0 94px 0;
  font-size: 64px;
}

.pickup-item-company {
  margin: 0 0 6px 0;
  font-size: 15px;
}

.pickup-item-genre {
  color: #8a8a8a;
  font-size: 12px;
}

.pickup-item-arrow {
  position: absolute;
  top: 28px;
  right: 0;
  width: 48px;
  height: 48px;
}

//
// project section
//
.project {
  // color: #f2b744;
}

//
// about section
//
.about {
  position: relative;
}

.about-bg {
  padding: 86px 40px;
  background-color: $color-gray;
}

.about-border {
  position: relative;
  background-color: $color-white;
  border: solid 1px $color-black;
  overflow: hidden;
}

.about-list {
  display: flex;
}

.about-img-01 {
  width: vw(470);
  height: vw(483);
}

.about-img-02 {
  width: vw(470);
  height: vw(483);
}

.about-loop-text {
  color: transparent;
  font-size: 120px;
  -webkit-text-stroke: 1px $color-black;
  text-stroke: 1px $color-black;
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
