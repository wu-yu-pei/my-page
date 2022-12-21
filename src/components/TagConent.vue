<template>
  <div class="tag-content">
    <TagItem v-bind="item" v-for="item in tags"></TagItem>
  </div>
</template>

<script setup lang="ts">
import TagItem from './TagItem.vue';

let tags = [
  {
    top: '500',
    left: '100',
    href: 'https://page.wuyupei.top/',
    text: 'My Page',
    color: getColor(),
  },
  {
    top: '600',
    left: '300',
    href: 'https://github.com/',
    text: 'Github',
    color: getColor(),
  },
  {
    top: '600',
    left: '200',
    href: 'https://wuyupei.top/',
    text: 'Blog',
    color: getColor(),
  },
  {
    top: '600',
    left: '1200',
    href: 'https://lanhuapp.com/',
    text: '蓝湖',
    color: getColor(),
  },
];

function getColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return 'rgba(' + r + ',' + g + ',' + b + ',0.8)';
}
</script>

<style scoped lang="less">
.tag-content {
  position: fixed;
  top: 49px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
