<template>
  <div class="body" :style="{ marginTop: showDock ? '0' : '220px' }">
    <div class="body-search">
      <Select @changeSearchOrigin="searchOriginChange" class="select" />
      <div class="input" ref="divRef">
        <input
          v-model="search"
          type="text"
          ref="inputRef"
          @input="handleInput"
          @focus="handleFocus"
        />
        <div class="more" :class="{ show: keyword.length !== 0 || moreIsshow }">
          <div v-if="moreIsshow" class="loading">
            <div class="loadingio-spinner-eclipse-td57dbpe2wr">
              <div class="ldio-3uhj7om3fdq">
                <div></div>
              </div>
            </div>
          </div>
          <template v-for="(item, index) in keyword" :key="index">
            <KeyWordItem :keyword="item" @keyword-item-click="hendleKeywordItemClick"></KeyWordItem>
          </template>
        </div>
      </div>
    </div>
    <template v-if="showDock">
      <Dock></Dock>
    </template>
    <ContextMenu
      v-bind="contextMenuPosition"
      :showDock="showDock"
      @dockMenuClick="dockMenuClick"
    ></ContextMenu>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useDebounceFn, onClickOutside } from '@vueuse/core';

import Select from '../base-ui/Select.vue';
import Dock from '../base-ui/Dock.vue';

import { getKeyWord } from '../api/index';

import { searchConfig } from '../config/search.config';
import KeyWordItem from '../base-ui/KeyWordItem.vue';
import ContextMenu from './ContextMenu.vue';

const search = ref('');
const searchOrigin = ref();
const inputRef = ref<InstanceType<typeof HTMLElement>>();
const divRef = ref<InstanceType<typeof HTMLElement>>();

const keyword = ref([]);
const moreIsshow = ref(false);
const contextMenuPosition = reactive({ top: '0px', left: '0px', show: false });
const showDock = ref(true);

// init searchOrg
if (JSON.parse(localStorage.getItem('searchOrigin')!)) {
  searchOrigin.value = JSON.parse(localStorage.getItem('searchOrigin')!)[0];
} else {
  searchOrigin.value = searchConfig[0];
}

// click search useDebounceFn
const handleSearch = (e: any) => {
  if (e.code !== 'Enter') return;
  if (!search.value.trim()) return;
  location.href = searchOrigin.value.url + search.value;
};

// searchOrigin change
const searchOriginChange = (Origin: any) => {
  searchOrigin.value = Origin;
};

// handle input
const handleInput = useDebounceFn(async (e: any) => {
  const word = e.target.value;

  if (!word.trim()) {
    return (keyword.value = []);
  }

  moreIsshow.value = true;
  keyword.value = [];
  const res = await getKeyWord(word);
  keyword.value = res.keyword;
  moreIsshow.value = false;
}, 500);

const handleFocus = async (e: any) => {
  const word = e.target.value;
  if (!word.trim()) {
    return (keyword.value = []);
  }
  keyword.value = [];
  moreIsshow.value = true;
  const res = await getKeyWord(word);
  keyword.value = res.keyword;
  moreIsshow.value = false;
};

const hendleKeywordItemClick = (res: any) => {
  location.href = searchOrigin.value.url + res;
};

onClickOutside(divRef, () => {
  keyword.value = [];
  moreIsshow.value = false;
});

// auto focus
onMounted(() => {
  search.value = '';
  // 自动聚焦
  inputRef.value!.focus();
  document.addEventListener('keydown', handleSearch);
  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('click', handleDocumentClick);
});

const handleDocumentClick = () => {
  contextMenuPosition.show = false;
};

const dockMenuClick = () => {
  showDock.value = !showDock.value;
  contextMenuPosition.show = false;
};

const handleContextMenu = (e: any) => {
  e.preventDefault();
  const { clientX: left, clientY: top } = e;
  contextMenuPosition.top = `${top - 10}px`;
  contextMenuPosition.left = `${left - 10}px`;
  contextMenuPosition.show = true;
};

// remove event
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleSearch);
});
</script>

<style scoped lang="less">
.body {
  // width: 1200px;
  margin: auto;
  height: calc(100% - 250px);
  transition: all 0.5s linear;
  .body-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    width: 70%;
    margin: 0 auto 30px;
    outline: none;
    .input {
      position: relative;
      flex: 6;
      input {
        width: 100%;
        height: 3rem;
        border: 1px solid #fccc;
        border-radius: 5px;
        font-size: 20px;
        padding-left: 5px;
        margin-right: 17px;
        letter-spacing: 3px;
        transition: all linear 0.1s;
        &:focus {
          border: 1px solid #000;
          background-color: rgb(244, 228, 228);
          outline: none;
        }
      }
      .more {
        position: absolute;
        display: none;
        padding: 10px 0px 10px 8px;
        width: 100%;
        min-height: 56px;
        top: 56px;
        left: 0;
        background-color: #fff;
        z-index: 90;
        border-radius: 5px;
        .loading {
          width: 100%;
          display: flex;
          justify-content: center;
          align-self: center;
        }
      }
      .show {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
    }
    .select {
      flex: 1;
    }
  }
}
@keyframes ldio-3uhj7om3fdq {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.ldio-3uhj7om3fdq div {
  position: absolute;
  animation: ldio-3uhj7om3fdq 1s linear infinite;
  width: 74px;
  height: 74px;
  top: 13px;
  left: 13px;
  border-radius: 50%;
  box-shadow: 0 2px 0 0 #5c26ad;
  transform-origin: 37px 38px;
}
.loadingio-spinner-eclipse-td57dbpe2wr {
  width: 30px;
  height: 30px;
  display: inline-block;
  overflow: hidden;
  background: #fdfdfd;
}
.ldio-3uhj7om3fdq {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.3);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-3uhj7om3fdq div {
  box-sizing: content-box;
}
</style>
