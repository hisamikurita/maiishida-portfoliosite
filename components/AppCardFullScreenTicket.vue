<script setup>
const project = defineProps(["project"]);
const { id } = project;
console.log(project);
console.log(id);
</script>

<template>
  <article class="article">
    <NuxtLink to="#" class="article-link">
      <div class="article-left">
        <div class="article-border">
          <h2 class="article-title-wrapper">
            <span class="article-title-num">01</span>
            <span class="article-title">
              FIND YOUR SPIRITS
              <span class="article-title-ja">色づけ、わたし</span>
            </span>
          </h2>
          <dl class="article-dl article-dl-outline">
            <dt class="article-dt">・OUTLINE</dt>
            <dd class="article-dd">
              <span class="article-dd-ja">
                自分だけの色(フロンティア)を見つけよう。<br />
                大人になっても輝かしい青春を送ることができる。<br />
                そんなイメージを表現したフロンティア様のリクルートサイトです。
              </span>
              <span class="article-dd-en">
                FIND YOUR OWN COLOR (FRONTIER).<br /><br />EVEN IF YOU BECOME AN
                ADULT, YOU CAN STILL ENJOY YOUR BRILLIANT YOUTH.THIS
                <br />RECRUITING SITE FOR FRONTIER EXPRESSES SUCH AN IMAGE.
              </span>
            </dd>
          </dl>
          <dl class="article-dl">
            <dt class="article-dt">・SITE TYPE</dt>
            <dd class="article-dd">RECRUIT SITE</dd>
          </dl>
          <dl class="article-dl">
            <dt class="article-dt">・CLIENT</dt>
            <dd class="article-dd">FRONTIER, INC</dd>
          </dl>
          <dl class="article-dl">
            <dt class="article-dt">・MY ROLE</dt>
            <dd class="article-dd">
              WEB DESIGN<br />ILLUSTRATION<br />ANIMATION DESIGN
            </dd>
          </dl>
          <div class="article-move-text">
            <AppLoopText loop-text="HOGE" />
          </div>
        </div>
      </div>
      <div class="article-right">
        <div class="article-border">
          <nuxt-icon name="asterisk" filled class="article-asterisk" />
        </div>
        <div class="article-index">
          <span class="article-index-count">01</span>
          <span class="article-index-all">05</span>
        </div>
        <p class="article-detail">
          MORE DETAIL
          <nuxt-icon name="arrow" filled class="article-detail-arrow" />
        </p>
      </div>
    </NuxtLink>
    <div class="article-canvas">
      <AppParticle />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.article {
  position: relative;
  height: calc(var(--vh, 1vh) * 100);
}

.article-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.article-link {
  display: flex;
  width: 100%;
  height: 100%;
}

.article-left {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 30px 20px;
  background-color: #0d48bc;
  border-radius: 24px;
}

.article-right {
  position: relative;
  width: 40.5%;
  height: 100%;
  padding: 30px 20px;
  background-color: #0d48bc;
  border-radius: 24px;
}

.article-border {
  position: relative;
  width: 100%;
  height: 100%;
  border: solid 1px #0a3a96;
  overflow: hidden;
}

.article-title-wrapper {
  display: flex;
  margin: 0 0 0 20px;
  padding: 14px 0 40px 0;
  font-size: vw(100);
  border-bottom: solid 1px #0a3a96;
}

.article-title {
  position: relative;
  top: -15px;
}

.article-title-num {
  flex-shrink: 0;
  margin: 0 18px 0 0;
  font-size: 15px;
}

.article-title-ja {
  display: block;
  font-size: 28px;
}

.article-dl {
  display: flex;
  margin: 0 0 0 20px;
  padding: 14px 0 40px 0;
  font-size: 16px;

  &:not(:last-of-type) {
    border-bottom: solid 1px #0a3a96;
  }
}

.article-dl-outline {
  padding: 14px 0 20px 0;
}

.article-dt {
  flex-shrink: 0;
  width: 126px;
}

.article-dd {
  position: relative;
  top: -1px;
  font-size: 16px;
  line-height: 1.28;
}

.article-dd-ja {
  display: block;
  margin: 0 0 32px 0;
}

.article-dd-en {
  display: block;
  font-size: 12px;
  line-height: 1;
}

.article-move-text {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 0 0 0;
  color: transparent;
  font-size: 80px;
  -webkit-text-stroke: 2px #0a3a96;
  text-stroke: 2px #0a3a96;
  border-top: solid 1px #0a3a96;
}

.article-asterisk {
  position: absolute;
  top: 20px;
  right: 30px;
  width: 62px;
  height: 62px;
  color: $color-black;
}

.article-detail {
  display: flex;
  position: absolute;
  bottom: 36px;
  right: 34px;
  font-size: 32px;
}

.article-detail-arrow {
  width: 23px;
  height: 23px;
  margin: 0 0 0 12px;
}

.article-index {
  position: absolute;
  top: 35%;
  right: 42px;
  width: 16px;
  height: 40px;
  color: $color-white;
  font-size: 16px;
  white-space: nowrap;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100%;
    height: 1px;
    background-color: $color-white;
  }
}

.article-index-count {
  display: block;
  margin: 0 0 8px 0;
}

.article-index-all {
  display: block;
  opacity: 0.5;
}
</style>
