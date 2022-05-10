<template>
  <div class="content" :style="{ background: `url(${state.WallpaperImgUlr})` }">
    <Header />
    <Body />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Body from './components/Body.vue';
import useMainStore from './store/index';

const state = useMainStore();
</script>

<style>
.content {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  background-size: cover;
}
</style>
