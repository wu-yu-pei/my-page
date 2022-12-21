<template>
  <div class="tag-item" v-drag :style="{ top: top + 'px', left: left + 'px', background: color }">
    <a :href="href">{{ text }}</a>
  </div>
</template>

<script setup lang="ts">
defineProps({
  top: String,
  left: String,
  color: String,
  href: String,
  text: String,
});
</script>

<style scoped lang="less">
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
</style>
