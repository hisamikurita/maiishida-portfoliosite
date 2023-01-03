<script setup>
const props = defineProps(["project", "index"]);
const { id, title, desc, client, type, role, color } = props.project;
const index = props.index + 1.0;
const mainColor = ref(color.main);
const subColor = ref(color.sub);
const borderColor = ref(color.border);
// microCMSでテキストエリアにした部分は改行が\nなので<br>に置換する
const replaceDescJa = desc.ja.replaceAll("\n", "<br>");
const replaceDescEn = desc.en.replaceAll("\n", "<br>");
const replaceRole = role.replaceAll("\n", "<br>");
</script>

<template>
  <article class="article">
    <NuxtLink :to="`/works/${id}`" class="article-link">
      <div class="article-left">
        <div class="article-border">
          <h2 class="article-title-wrapper">
            <span class="article-title-num">0{{ index }}</span>
            <span class="article-title">
              {{ title.main }}
              <span class="article-title-ja">{{ title.sub }}</span>
            </span>
          </h2>
          <dl class="article-dl article-dl-outline">
            <dt class="article-dt">・OUTLINE</dt>
            <dd class="article-dd">
              <span v-html="replaceDescJa" class="article-dd-ja"></span>
              <span v-html="replaceDescEn" class="article-dd-en"></span>
            </dd>
          </dl>
          <dl class="article-dl">
            <dt class="article-dt">・SITE TYPE</dt>
            <dd class="article-dd">{{ type }}</dd>
          </dl>
          <dl class="article-dl">
            <dt class="article-dt">・CLIENT</dt>
            <dd class="article-dd">{{ client }}</dd>
          </dl>
          <dl class="article-dl">
            <dt class="article-dt">・MY ROLE</dt>
            <dd v-html="replaceRole" class="article-dd"></dd>
          </dl>
          <div class="article-loop-text">
            <AppLoopText :loop-text="title.main" />
          </div>
        </div>
      </div>
      <div class="article-right">
        <div class="article-border">
          <nuxt-icon name="asterisk" filled class="article-asterisk" />
        </div>
        <div class="article-index">
          <span class="article-index-count">0{{ index }}</span>
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
  color: v-bind(subColor);
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
  background-color: v-bind(mainColor);
  border-radius: 24px;
}

.article-right {
  position: relative;
  width: 40.5%;
  height: 100%;
  padding: 30px 20px;
  background-color: v-bind(mainColor);
  border-radius: 24px;
}

.article-border {
  position: relative;
  width: 100%;
  height: 100%;
  border: solid 1px v-bind(borderColor);
  overflow: hidden;
}

.article-title-wrapper {
  display: flex;
  margin: 0 0 0 20px;
  padding: 14px 0 40px 0;
  font-size: vw(100);
  border-bottom: solid 1px v-bind(borderColor);
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
    border-bottom: solid 1px v-bind(borderColor);
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

.article-loop-text {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 0 0 0;
  color: transparent;
  font-size: 80px;
  -webkit-text-stroke: 2px v-bind(borderColor);
  text-stroke: 2px v-bind(borderColor);
  border-top: solid 1px v-bind(borderColor);
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
