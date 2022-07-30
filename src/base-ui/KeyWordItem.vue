<template>
  <span class="keyword-item" @click="handleClick">{{ keyword }}</span>
</template>

<script setup lang="ts">
const props = defineProps({
  keyword: {
    typeof: String,
    default: '',
  },
});
const emit = defineEmits(['keywordItemClick']);
const handleClick = () => {
  emit('keywordItemClick', props.keyword);
};
</script>

<style scoped lang="less">
.keyword-item {
  display: block;
  height: 24px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #000;
  margin: 5px 0;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: green;
  }
}
</style>
