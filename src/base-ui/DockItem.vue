<template>
  <a
    :href="source.link"
    class="dock-item"
    ref="the"
    :target="target"
    @mousedown="showDelete"
    @contextmenu.stop="(e:Event) => e.preventDefault()"
    @mouseenter="showCanvas"
  >
    <img :src="source.icon" alt="" :style="{ borderRadius: `${store.radius}px` }" />
    <div class="dock-item-info">{{ source.des }}</div>
    <div
      :class="{ show: isShowDelete && hasDelete }"
      class="dock-item-delete hidden"
      @click.prevent="deleteThis"
    >
      ×
    </div>
  </a>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onClickOutside, useMouse, useWindowSize } from '@vueuse/core';

import useMainStore from '../store/index';

import confetti from 'canvas-confetti';

const props = defineProps({
  source: {
    typeof: Object,
    default: {
      link: 'https://yayujs.com/',
      icon: 'https://yayujs.com/favicon-32x32.png',
      des: 'TypeScript中文文档',
    },
  },
  hasDelete: {
    type: Boolean,
    default: true,
  },
  target: {
    type: String,
    default: '_blank',
  },
});

const emit = defineEmits(['deleteThis']);

const store = useMainStore();

const isShowDelete = ref(false);
const the = ref(null);

const { x, y } = useMouse();
const { width, height } = useWindowSize();

const showDelete = (e: any) => {
  if (e.button != 2) return;
  isShowDelete.value = !isShowDelete.value;
};

const showCanvas = () => {
  if (!store.isOpenCanvas) return;
  confetti({
    particleCount: 10,
    spread: 50,
    origin: { x: x.value / width.value, y: y.value / height.value },
  });
};

const deleteThis = (e: any) => {
  emit('deleteThis');
};

onClickOutside(the, () => {
  isShowDelete.value = false;
});
</script>

<style scoped lang="less">
.dock-item {
  position: relative;
  width: 32px;
  height: 32px;
  transition: all linear 0.1s;
  margin: 0 10px;
  img {
    width: 32px;
    height: 32px;
  }
  &:hover {
    transform: scale(1.2);
  }
  img:hover + div {
    display: block;
  }
  .dock-item-info {
    display: none;
    position: absolute;
    bottom: -34px;
    left: 50%;
    height: 18px;
    transform: translateX(-50%);
    padding: 5px 5px;
    text-align: center;
    background-color: #000;
    border-radius: 5px;
    color: #fff;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    &::after {
      content: '';
      position: absolute;
      top: -16px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-bottom: 10px solid #000;
    }
  }
  .dock-item-delete {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    line-height: 10px;
    background-color: #fff;
    border-radius: 2px;
  }
}
</style>
