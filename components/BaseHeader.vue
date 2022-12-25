<script setup>
const menus = [
  {
    name: "WORKS",
    href: "works",
  },
  {
    name: "ABOUT ME",
    href: "about",
  },
  {
    name: "CONTACT",
    href: "contact",
  },
];
const snsList = [
  {
    name: "TW @maimai_kani",
    href: "https://twitter.com/maimai_kani",
  },
];
</script>

<template>
  <header class="root">
    <div class="header-container">
      <div class="header-inner">
        <nav class="header-nav">
          <ul class="header-nav-list">
            <li v-for="menu in menus" class="header-nav-item">
              <NuxtLink :to="menu.href" class="header-nav-link">{{
                menu.name
              }}</NuxtLink>
            </li>
          </ul>
        </nav>
        <ul class="header-sns-list">
          <li v-for="sns in snsList" class="header-sns-item">
            <NuxtLink :to="sns.href" class="header-sns-link">{{
              sns.name
            }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.root {
  position: fixed;
  top: 20px;
  left: 0;
  width: 100%;
  z-index: 1;
}
.header-container {
  padding: 0 vw(20);
}

.header-inner {
  display: flex;
  justify-content: space-between;
}

.header-nav-list {
  display: flex;
}

.header-nav-item {
  &:not(:last-of-type) {
    margin: 0 78px 0 0;
  }
}
</style>
