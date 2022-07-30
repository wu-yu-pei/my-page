<template>
  <ul class="select">
    <li v-for="(item, index) in origin" @click="handleClick(index)">{{ item.name }}</li>
  </ul>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { searchConfig } from '../config/search.config';
let origin = reactive(JSON.parse(localStorage.getItem('searchOrigin')!)) || reactive(searchConfig);

const emit = defineEmits(['changeSearchOrigin']);

// change search org
const handleClick = (index: number) => {
  [origin[0], origin[index]] = [origin[index], origin[0]];
  emit('changeSearchOrigin', origin[0]);
  localStorage.setItem('searchOrigin', JSON.stringify(origin));
};
</script>

<style scoped lang="less">
.select {
  list-style: none;
  border-radius: 5px;
  height: 3rem;
  transition: all linear 0.5s;
  background: transparent;
  z-index: 90;

  &:hover li {
    display: block;
    background-color: rgba(0, 0, 0, 0.2);
  }
  li {
    &:first-child {
      display: block;
    }
    letter-spacing: 2px;
    color: #fff;
    display: none;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    background: transparent;
    box-sizing: border-box;
    border-radius: 5px;
    &:hover {
      background-color: #655151;
    }
  }
}
</style>
