<template>
  <div class="content" ref="contentEl">
    <div class="filter" ref="filterEl" :style="{ backdropFilter: `blur(${state.blur}px)` }">
      <Header />
      <Body />
    </div>
    <div class="search" ref="searchEl" :style="style">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADRElEQVRYCb2XXUtUQRjH3dANJQUhZaOLCoK0IO+CLiKjNQL7FCoGQQSRQkhvFFEXSULd1OfoqsKtLLqriz5AUdobvZBa+FKn3/+ceXb3bOd4zu62/uHnzJmZ5+XMzpkZM00p5XneRoYegmOwF7Y4PMr38AFewD0oZDKZZcr6ReAc3IIFSKt5Bk5Bd1IGmbgBGGfpuwinoA0kvdU0FGAW9ObyodnYCpqhgyBbaQEm4QozsqKGVCK43voZmN5QGYJNSQ4Y0wGj8A5Mj6l0Jdn6/QzsAzNepj4O+v2rEjatMAErIL2GPWs6YYDe3IJ/pq7prEv4OAxfQVIS0euCjizYtCv4zroilxnjqwcsiSfUbY2URtF4FSRNe91vXvIc1PA5AKsgnQv106CpX1QPGg91/scHfJ/3I3jeD8rST8HDbdeh1V71gkubI77bYM7FmvLtFBBskxlK66zWccQ64RL4QtncxJ+jrmGJMvE7rzWw2RGjE+zTzG+gQ3u7NM1upZ2roSLGNwLMuCCDSqDPPRRcuR6FxdqlBHIuovb29ZLF2qEEdJBIOljWSxYrpwQ8FzX2ZGxgVotKwLKxmWhgvKJr24TmlYBuMpLO87rFJ9abwsk2N2ZWCbx0D7pM1CWCn8TBK8rhBEf9rv+pNqIjIOkQ6kgwjO3Gthd+g/QHIpOgvR206Ul5JZAF3eGk0dgIKTqwHwYFlyKToP203+t5HymDc4eKLpCSLiOtKWLFDsE+Ngn69LJvQbpQdMJDN9gsTBQ7aqzgKzIJ2q+D9BPsSwii0HBJPUgHRb7G2EUzfFQmcZM2WyO6aYdFZws8AknXp57wiOqf8FGehPxK9yF606OjC3RxlJTEQPVhwxb40JuXayw8ouKJkbvBktAdTtco+8ekYnT8IzZacNfApp2qL30dI/GW9DBgMxT84cGfOQrdZDrXNAxs9Z3rU7PVTtV7CGNQ/on6SUT/FoGjFoqzcAbaQVoFXSYKoCNV54gOM63o7dAP+8Gu3b+o6wY8yUVEiWhzuguKK7vkfQcjzcYN+A5ppfVzGf75d4y2EbCZuBM7A2QXEkbNNByAQdAtSqenLjPy8Ql0qD2HBzDDGy9RRkpJ0LEPjv8FY4TA6cLS3Z0AAAAASUVORK5CYII="
        alt=""
      />
      <input type="text" v-model="text" placeholder="回车搜索应用" />
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
  width: 45px;
  display: flex;
  position: fixed;
  z-index: 99999;
  transition: width linear 0.1s;
  overflow: hidden;
}

.search:hover {
  width: 245px;
}
.search img {
  width: 35px;
  height: 35px;
  margin-right: 10px;
  pointer-events: none;
}

.search input {
  width: 200px;
  height: 35px;
  border: none;
  padding-left: 10px;
  letter-spacing: 4px;
  /* margin-left: 20px; */
  border-bottom: 2px solid blue;
  font-size: 24px;
  background-color: transparent;
  outline: none;
}
</style>
