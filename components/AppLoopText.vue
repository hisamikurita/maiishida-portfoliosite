<script setup>
import { gsap } from "gsap";

const props = defineProps(["loopText"]);

const refRoot = ref();
const refText = ref();
const buffer = 1.2;
let rootElm = null;
let textElm = null;
let cloneTextElm = null;
let rootRect = null;
let textRect = null;
let cloneRect = null;
let textValue = "";
let xValue = { original: 0, clone: 0 };
let iObserver = null;

/**
 * ターゲットからループテキストを複製して親要素に追加する
 */
const cloneText = (root, original) => {
  cloneTextElm = document.createElement("span");
  cloneTextElm.className = original.className;
  cloneTextElm.innerHTML = original.textContent;
  root.append(cloneTextElm);
};

/**
 * テキストを親要素の(横幅*バッファー)を超えるまで生成する
 */
const createText = () => {
  // リサイズ時にテキストが途切れることがあるので、バッファー分余計に生成しておく
  while (rootRect.width * buffer > textRect.width) {
    textValue += `${textElm.textContent} `;
    textElm.innerHTML = textValue;

    rootRect = rootElm.getBoundingClientRect();
    textRect = textElm.getBoundingClientRect();

    // リサイズ時にクローンも同様にテキストを生成する
    if (cloneTextElm) cloneTextElm.innerHTML = textElm.textContent;
  }
};

/**
 * ループの設定
 */
const setLoop = () => {
  xValue.original--;
  xValue.clone--;

  gsap.set(textElm, {
    x: xValue.original,
  });
  gsap.set(cloneTextElm, {
    x: xValue.clone,
  });

  rootRect = rootElm.getBoundingClientRect();
  textRect = textElm.getBoundingClientRect();
  cloneRect = cloneTextElm.getBoundingClientRect();

  // 親要素から見えなくなったら、テキストの横幅分位置を戻す
  if (rootRect.left > textRect.right) {
    xValue.original = textRect.width;
    gsap.set(textElm, {
      x: xValue.original,
    });
  }
  // クローンは初期位置に戻す
  if (rootRect.left > cloneRect.right) {
    xValue.clone = 0;
    gsap.set(cloneTextElm, {
      x: 0,
    });
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
          gsap.ticker.add(setLoop);
        } else {
          gsap.ticker.remove(setLoop);
        }
      });
    },
    { rootMargin: "0%" }
  );
  iObserver.observe(rootElm);
};

const init = () => {
  createText();
  cloneText(rootElm, textElm);
  observe();
  window.addEventListener("resize", createText);
};

const destroy = () => {
  iObserver.unobserve(rootElm);
  gsap.ticker.remove(setLoop);
  window.removeEventListener("resize", createText);
};

// Lifecycle Hooks

onMounted(() => {
  rootElm = refRoot.value;
  textElm = refText.value;
  rootRect = rootElm.getBoundingClientRect();
  textRect = textElm.getBoundingClientRect();

  init();
});

onBeforeUnmount(() => {
  destroy();
});
</script>

<template>
  <div ref="refRoot" class="root">
    <span ref="refText" class="app-loop-text">{{ props.loopText }}</span>
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  width: 100%;
  height: 100%;
  white-space: nowrap;
}
</style>

<!-- クローンを動的に生成するクラスはscopedから外す -->
<style lang="scss">
.app-loop-text {
  display: block;
  padding: 0 8px;
}
</style>
