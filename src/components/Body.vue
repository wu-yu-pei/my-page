<template>
  <div class="body">
    <div class="body-search">
      <Select @changeSearchOrigin="searchOriginChange" class="select" />
      <input v-model="search" type="text" ref="inputRef" />
    </div>
    <Dock></Dock>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

import Select from '../base-ui/Select.vue';
import Dock from '../base-ui/Dock.vue';

import { searchConfig } from '../config/search.config';

const search = ref('');
const searchOrigin = ref();
const inputRef = ref<InstanceType<typeof HTMLElement>>();

// init searchOrg
if (JSON.parse(localStorage.getItem('searchOrigin')!)) {
  searchOrigin.value = JSON.parse(localStorage.getItem('searchOrigin')!)[0];
} else {
  searchOrigin.value = searchConfig[0];
}

// click search
const handleSearch = (e: any) => {
  if (e.code !== 'Enter') return;
  if (!search.value.trim()) return;
  location.href = searchOrigin.value.url + search.value;
};

// searchOrigin change
const searchOriginChange = (Origin: any) => {
  searchOrigin.value = Origin;
};

// auto focus
onMounted(() => {
  search.value = '';
  // 自动聚焦
  inputRef.value!.focus();
  document.addEventListener('keydown', handleSearch);
});

// remove event
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleSearch);
});
</script>

<style scoped lang="less">
.body {
  // width: 1200px;
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
      margin-right: 17px;
      &:focus {
        border: 1px solid #fccc;
        outline: none;
      }
    }
    .select {
      flex: 1;
    }
  }
}
</style>
