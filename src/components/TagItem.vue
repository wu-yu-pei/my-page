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

</style>
