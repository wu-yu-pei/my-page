<template>
  <div class="content" ref="contentEl">
    <div class="filter" ref="filterEl" :style="{ backdropFilter: `blur(${state.blur}px)` }">
      <Header />
      <Body />
    </div>
    <div class="search" ref="searchEl" :style="style">
      <img src="./assets/img/tutu.gif" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useDraggable } from '@vueuse/core';

import Header from './components/Header.vue';
import Body from './components/Body.vue';

import useMainStore from './store/index';
import useSyncConfig from './hooks/useSyncConfig';

const state = useMainStore();
const contentEl = ref(null);
const filterEl = ref(null);
const searchEl = ref<HTMLDivElement | null>(null);
const text = ref('');

const { x, y, style } = useDraggable(searchEl, {
  initialValue: { x: 40, y: 800 },
});

if (state.userId) {
  useSyncConfig(state.userId);
  
}
onMounted(() => {
  const image = new Image();
  image.src = state.WallpaperImgUlr;
  image.onload = () => {
    (contentEl.value as any).style.background = `url(${state.WallpaperImgUlr})`;
    (contentEl.value as any).style.backgroundSize = `cover`;
    (filterEl.value as any).style.backdropFilter = `blur(${state.blur}px)`;
  };
});
// 监听是否发生变化
watch(
  () => state.WallpaperImgUlr,
  () => {
    (contentEl.value as any).style.background = `url(${state.WallpaperImgUlr})`;
  }
);
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  background-color: skyblue;
  background-size: cover;
}
.filter {
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(100px);
}
.search {
  display: flex;
  position: fixed;
  z-index: 99999;
  transition: width linear 0.1s;
  overflow: hidden;
}
.search img {
  pointer-events: none;
}
</style>
