<template>
  <ul
    ref="ul"
    class="context-menu"
    :style="{ top: props.top, left: props.left, display: props.show ? 'block' : 'none' }"
  >
    <li @click="dockMenuClick">{{ showDock ? '隐藏' : '显示' }}Dock栏</li>
    <li @click="beifen">微信备份</li>
    <li>当前时间:{{ data }}</li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import useMemory from '../hooks/useMemory';
const props = defineProps({
  top: {
    type: String,
    required: true,
  },
  left: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
  showDock: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['dockMenuClick']);

const data = ref(null);

const timer = ref<any>(null);

const dockMenuClick = function () {
  emit('dockMenuClick');
};

const beifen = () => {
  useMemory();
};

onMounted(() => {
  timer.value = setInterval(() => {
    data.value = (new Date() as any).toString().slice(16, 25);
  }, 1000);
});

// remove event
onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>

<style scoped lang="less">
.context-menu {
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px 5px;
  background-color: #fff;
  z-index: 999999;
  color: #000;
  border-radius: 10px;
  border: 1px solid #000;
  li {
    list-style: none;
    width: 120px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding: 0 5px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: rgba(00, 0, 0, 0.2);
    }
  }
}
</style>
