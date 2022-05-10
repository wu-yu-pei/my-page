<template>
  <draggable
    v-model="source"
    group="people"
    class="dock"
    @start="drag = true"
    @end="drag = false"
    item-key="id"
  >
    <template #item="{ element }">
      <DockItem :source="element" @delete-this="deleteDockItem"></DockItem>
    </template>
    <template #footer>
      <DockItem
        :source="{ link: '#', icon: imgUrl, des: '添加快捷' }"
        @click="add"
        :has-delete="false"
      ></DockItem>
    </template>
  </draggable>

  <Modle v-model:newSource="newSource" @sure="sure" @cancle="cancle" :showModle="showModle"></Modle>
</template>

<script setup lang="ts">
import { ref, reactive, defineEmits, nextTick } from 'vue';

import Modle from '../base-ui/Modle.vue';
import DockItem from './DockItem.vue';
import Draggable from 'vuedraggable';

import { Document } from '../config/bodyconfig';
import imgUrl from '../assets/img/add.png';

const source = ref();
const newSource = reactive<any>({
  newWork: '',
  iconUrl: '',
  des: '',
});
const showModle = ref(false);
const drag = ref(false);
const myArr = [1, 23, 5, 64];

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

const sure = () => {
  if (!newSource.newWork.trim() || !newSource.iconUrl.trim() || !newSource.des.trim()) {
    showModle.value = false;
    clearSourceValue();
    return;
  }
  const itemInfo = { link: newSource.newWork, icon: newSource.iconUrl, des: newSource.des };

  const menu = JSON.parse(localStorage.getItem('menu')!);
  menu.push(itemInfo);
  localStorage.setItem('menu', JSON.stringify(menu));

  source.value = JSON.parse(localStorage.getItem('menu')!);

  showModle.value = false;
  clearSourceValue();
};

const cancle = () => {
  showModle.value = false;
  clearSourceValue();
};

const add = () => {
  showModle.value = true;
};

const clearSourceValue = () => {
  for (let key in newSource) {
    newSource[key] = '';
  }
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
