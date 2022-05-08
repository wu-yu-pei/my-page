<template>
  <ul class="select">
    <li v-for="(item, index) in origin" @click="handleClick(index)">{{ item.name }}</li>
  </ul>
</template>

<script setup lang="ts">
import { reactive, defineEmits } from 'vue';
import { searchConfig } from '../config/search.config';
let origin = reactive(searchConfig);

const emit = defineEmits(['changeSearchOrigin']);

const handleClick = (index: number) => {
  [origin[0], origin[index]] = [origin[index], origin[0]];
  emit('changeSearchOrigin', origin[0]);
};
</script>

<style scoped lang="less">
.select {
  list-style: none;
  border-radius: 5px;
  height: 3rem;
  transition: all linear 0.5s;
  background: transparent;
  &:hover li {
    display: block;
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
