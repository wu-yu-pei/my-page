<template>
  <div class="body">
    <div class="body-search">
      <Select @changeSearchOrigin="searchOriginChange" class="select" />
      <input v-model="search" type="text" />
    </div>
    <div class="body-content">
      <Category :source="Document" :is-folad="false" />
      <Category :source="Community" :is-folad="false" />
      <Category :source="Video" :is-folad="false" />
      <Category :source="Video" :is-folad="false" />
      <Category :source="Video" :is-folad="false" />
      <Category :source="Video" :is-folad="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

import Select from '../base-ui/Select.vue';
import Category from '../base-ui/Category.vue';

import { searchConfig } from '../config/search.config';
import { Document, Video, Community } from '../config/bodyconfig';

const search = ref('');
const searchOrigin = ref(searchConfig[0]);

const handleSearch = (e: any) => {
  if (e.code !== 'Enter') return;
  if (!search.value.trim()) return;
  location.href = searchOrigin.value.url + search.value;
};

const searchOriginChange = (Origin: any) => {
  searchOrigin.value = Origin;
};

onMounted(() => {
  search.value = '';
  document.addEventListener('keydown', handleSearch);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleSearch);
});
</script>

<style scoped lang="less">
.body {
  width: 1200px;
  margin: auto;
  .body-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    width: 70%;
    margin: 0 auto 30px;
    outline: none;
    input {
      flex: 6;
      height: 3rem;
      border: 1px solid #fccc;
      border-radius: 5px;
      font-size: 20px;
      padding-left: 5px;
      &:focus {
        border: 1px solid #fccc;
        outline: none;
      }
    }
    .select {
      flex: 1;
    }
  }
  .body-content {
    display: flex;
    gap: 25px;
    // justify-content: space-between;
  }
}
</style>
