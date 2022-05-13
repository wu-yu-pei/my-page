<template>
  <input
    type="range"
    :value="value"
    min="0"
    :max="max"
    ref="inputRef"
    @input="change"
    id="range"
    :style="{ width: width }"
  />
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue';
defineProps({
  value: {
    type: Number,
    default: 10,
  },
  max: {
    type: Number,
    default: 100,
  },
  width: {
    type: String,
    default: '100%',
  },
});

const emit = defineEmits(['update']);

const inputRef = ref<HTMLInputElement>();

const change = (e: any) => {
  emit('update', e.target.value);
};
</script>

<style scoped lang="less">
#range {
  margin: 10px 0;
}
input[type='range'] {
  -webkit-appearance: none;
  width: 200px;
  height: 10px;
  border-radius: 5px;
  background: #ccc;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  position: relative;
  width: 10px;
  height: 10px;
  background: #000;
  border-radius: 50%;
  transition: 0.2s;
}
</style>
