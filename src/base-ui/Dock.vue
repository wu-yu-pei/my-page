<template>
  <!-- 拖拽区域 -->
  <draggable v-model="muenSource" class="dock" @start="dragStart" @end="dragEnd" item-key="link">
    <template #item="{ element, index }">
      <DockItem :source="element" @delete-this="deleteDockItem(index)"></DockItem>
    </template>
    <template #footer>
      <DockItem
        :source="{ link: '#', icon: imgUrl, des: '添加快捷' }"
        @click="add"
        :has-delete="false"
      ></DockItem>
    </template>
  </draggable>
  <!-- 弹出框 -->
  <Modle v-model:newSource="newSource" @sure="sure" @cancle="cancle" :showModle="showModle"></Modle>
</template>

<script setup lang="ts">
import { ref, reactive, defineEmits, computed } from 'vue';

import Modle from '../base-ui/Modle.vue';
import DockItem from './DockItem.vue';
import Draggable from 'vuedraggable';

import useMainStore from '../store/index';

import imgUrl from '../assets/img/add.png';

const emit = defineEmits(['add']);
const store = useMainStore();

const newSource = reactive<any>({
  newWork: '',
  iconUrl: '',
  des: '',
});
const showModle = ref(false);
const drag = ref(false);

// 存loaclStorage里面
localStorage.setItem('menu', JSON.stringify(store.muenSource));

// 持久化拖拽
const muenSource = computed<any>({
  get() {
    return store.muenSource;
  },
  set(newValue) {
    localStorage.setItem('menu', JSON.stringify(newValue));
    store.muenSource = newValue;
  },
});

// delete item
const deleteDockItem = (index: any) => {
  if (store.muenSource.length <= 1) return;
  store.muenSource.splice(index, 1);
  localStorage.setItem('menu', JSON.stringify(store.muenSource));
};

// sure add item
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

  store.muenSource = JSON.parse(localStorage.getItem('menu')!);

  showModle.value = false;
  clearSourceValue();
};

// cancle add item
const cancle = () => {
  showModle.value = false;
  clearSourceValue();
};

// show model
const add = () => {
  showModle.value = true;
};

// clear ole value
const clearSourceValue = () => {
  for (let key in newSource) {
    newSource[key] = '';
  }
};

// drag start
const dragStart = (Event: any) => {
  drag.value = true;
};

// darg end
const dragEnd = (Evnent: any) => {
  drag.value = false;
};
</script>

<style scoped>
.dock {
  width: 70%;
  display: flex;
  gap: 50px 18px;
  margin: 15px auto 0;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding-left: 37px;
}
</style>
