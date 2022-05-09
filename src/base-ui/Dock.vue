<template>
  <div class="dock">
    <template v-for="(item, index) in source" :key="item.link">
      <DockItem :source="item" @delete-this="deleteDockItem(index)"></DockItem>
    </template>
    <DockItem
      :source="{ link: '#', icon: imgUrl, des: '添加快捷' }"
      @click="add"
      :has-delete="false"
    ></DockItem>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

import DockItem from './DockItem.vue';
import { Document } from '../config/bodyconfig';
import imgUrl from '../assets/img/add.png';

let source = ref();

const emit = defineEmits(['add']);

if (JSON.parse(localStorage.getItem('menu')!)) {
  source.value = JSON.parse(localStorage.getItem('menu')!);
} else {
  source.value = Document;
}

// 存loaclStorage里面
localStorage.setItem('menu', JSON.stringify(source.value));

const deleteDockItem = (index: any) => {
  if (source.value.length <= 1) return;
  source.value.splice(index, 1);
  localStorage.setItem('menu', JSON.stringify(source.value));
};

const add = () => {
  const link = prompt('请输入网页地址');
  if (!link) return;
  const icon = prompt('请输入网页图标');
  if (!icon) return;
  const des = prompt('请输入网页描述');
  if (!des) return;
  const itemInfo = { link, icon, des };

  const menu = JSON.parse(localStorage.getItem('menu')!);
  menu.push(itemInfo);
  localStorage.setItem('menu', JSON.stringify(menu));

  source.value = JSON.parse(localStorage.getItem('menu')!);
};
</script>

<style scoped>
.dock {
  width: 70%;
  display: flex;
  justify-content: space-between;
  gap: 50px 20px;
  margin: 15px auto 0;
  flex-wrap: wrap;
}
</style>
