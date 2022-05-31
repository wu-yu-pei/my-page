<template>
  <div
    class="modle"
    :style="{ transform: `translate(-50%, -50%) scale(${showModle ? 1 : 0})` }"
    ref="target"
  >
    <h2>新增快捷</h2>
    <div class="modle-form">
      <p><span>网 址:</span><input v-model="newSource.newWork" type="text" /></p>
      <p><span>图 标:</span><input v-model="newSource.iconUrl" type="text" /></p>
      <p><span>描 述:</span><input v-model="newSource.des" type="text" /></p>
    </div>
    <div class="modle-control">
      <button @click="sure">确定</button>
      <button @click="cancle">取消</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  newSource: {
    type: Object,
    default: '',
  },
  showModle: {
    type: Boolean,
    defaule: false,
  },
});

const target = ref();

const emit = defineEmits(['update:newSource', 'sure', 'cancle']);

const sure = () => {
  emit('sure');
};

const cancle = () => {
  emit('cancle');
};

onClickOutside(target, () => {
  emit('cancle');
});
</script>

<style scoped lang="less">
.modle {
  justify-content: center;
  flex-wrap: wrap;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  color: #000;
  background: #fff;
  box-shadow: 1px 1px 10px #ccc;
  border-radius: 10px;
  transition: all ease-in 0.2s;
  opacity: 1;
  h2 {
    text-align: center;
    margin-top: 10px;
    font-weight: 500;
  }
  .modle-form {
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin: 15px 0;
      span {
        display: inline-block;
        width: 50px;
      }
      input {
        font-size: 16px;
        width: 80%;
        height: 40px;
        border: none;
        border-bottom: 1px solid #000;
        &:focus {
          outline: none;
        }
      }
    }
  }
  .modle-control {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 50px;
    margin-top: 40px;
    button {
      width: 100px;
      height: 30px;
      border: none;
      padding: 5px 10px;
      background-color: #fff;
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        background: #000;
        color: #fff;
      }
    }
  }
}
</style>
