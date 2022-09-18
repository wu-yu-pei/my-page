<template>
  <div class="content" ref="contentEl">
    <div class="filter" ref="filterEl" :style="{ backdropFilter: `blur(${state.blur}px)` }">
      <Header />
      <Body />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Header from './components/Header.vue';
import Body from './components/Body.vue';

import useMainStore from './store/index';
import useSyncConfig from './hooks/useSyncConfig';

const state = useMainStore();
const contentEl = ref(null);
const filterEl = ref(null);

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
</style>
