<template>
  <div class="dock">
    <template v-for="(item, index) in source" :key="item.link">
      <DockItem :source="item" :index="index" @delete-this="deleteDockItem(index)"></DockItem>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DockItem from './DockItem.vue';
import { Document } from '../config/bodyconfig';

let source = ref(Document);

const deleteDockItem = (index: any) => {
  source.value.splice(index, 1);
};
</script>

<style scoped>
.dock {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 15px auto 0;
}
</style>
