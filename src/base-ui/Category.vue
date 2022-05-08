<template>
  <div class="category" :class="{ zhedie: Folad }">
    <template v-if="!Folad">
      <h3 @click="folad">{{source!.title}}</h3>
    </template>
    <template v-else>
      <img :src="source!.img" alt="" @click="folad" />
    </template>
    <a v-for="(item, index) in source!.children" :href="item.link" class="category-item">
      <img :src="item.icon" alt="" />
      <span>{{ item.des }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  isFolad: {
    type: Boolean,
    default: false,
  },
  source: {
    type: Object,
    defaulte: {},
  },
});

let Folad = ref(props.isFolad);
const folad = () => {
  Folad.value = !Folad.value;
};
</script>

<style scoped lang="less">
a {
  color: #fff;
  text-decoration: none;
}
.category {
  width: 200px;
  height: 500px;
  overflow-y: auto;
  // border: 1px solid #0e0505;
  color: #fff;
  box-sizing: border-box;
  padding: 10px 0 0 10px;
  transition: all linear 0.5s;
  h3 {
    font-size: 20px;
    font-weight: normal;
    letter-spacing: 3px;
  }
  img {
    width: 20px;
    height: 20px;
  }
  .category-item {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 15px 0;
    width: 100%;
    :hover {
      color: blue;
    }
    img {
      width: 20px;
      height: 20px;
    }
    span {
      letter-spacing: 3px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.zhedie {
  width: 40px;
  .category-item {
    transition: all linear 50ms;
    span {
      display: none;
    }
    img {
      transition: all linear 50ms;
    }
    &:hover > img {
      transform: scale(1.5);
    }
    &:hover + .category-item {
      margin: 20px 0 0;
    }
  }
}
</style>
