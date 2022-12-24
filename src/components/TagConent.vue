<template>
  <div class="tag-content">
    <template v-for="item in tags">
      <div
        class="tag-item"
        ref="tagRefs"
        v-drag
        :style="{ top: item.top + 'px', left: item.left + 'px', background: item.color }"
      >
        <a :href="item.href" target="_blank">{{ item.text }}</a>
      </div>
    </template>
    <div class="add" @click="addTag">
      <img src="../assets/img/add_tag.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMutationObserver, useElementBounding, useStorage, or } from '@vueuse/core';

let tagRefs = ref([]);
let tags = JSON.parse(localStorage.getItem('tags')!);

// 随机颜色
function getColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return 'rgba(' + r + ',' + g + ',' + b + ',0.8)';
}

// 更新storage
function setupStorage(index: number, top: any, left: any) {
  const tags = localStorage.getItem('tags');
  if (tags) {
    const res = JSON.parse(tags);
    res[index].top = top;
    res[index].left = left;
    localStorage.setItem('tags', JSON.stringify(res));
  }
}

function addTag() {
  let href = prompt('请输入网址');
  let text = prompt('请输入内容');
  if (!href?.trim() || !text?.trim()) return;

  let target = {
    color: 'rgba(114,131,59,0.8)',
    href: href,
    left: 20,
    text,
    top: 100,
  };

  let org = JSON.parse(localStorage.getItem('tags')!);

  org.push(target);

  localStorage.setItem('tags', JSON.stringify(org))
}

onMounted(() => {
  // 观察元素
  tagRefs.value.forEach((item, index) => {
    useMutationObserver(
      item,
      (mutations) => {
        if (mutations[0]) {
          const { top, left } = useElementBounding(item);
          setupStorage(index, top.value - 49, left.value);
        }
      },
      {
        attributes: true,
      }
    );
  });
});
</script>

<style scoped lang="less">
.tag-content {
  position: fixed;
  top: 49px;
  bottom: 0;
  left: 0;
  right: 0;
  .add {
    position: absolute;
    bottom: 0;
    left: 10px;
    color: #fff;
    &:hover {
      cursor: pointer;
    }
  }
  .tag-item {
    display: flex;
    align-items: center;
    position: absolute;
    padding: 5px 10px;
    color: #fff;
    border-radius: 5px;
    color: #fff;
    letter-spacing: 2px;
    &:hover {
      cursor: move;
    }
    a {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
