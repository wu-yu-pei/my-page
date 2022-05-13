<template>
  <div class="header-right">
    <div class="header-right-control">
      <img @click="isShow = !isShow" :src="!isShow ? userUrl : cancleUrl" alt="" />
    </div>
    <div class="header-right-content" :class="{ show: isShow, hidder: !isShow }" ref="target">
      <Login></Login>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

import userUrl from '../assets/img/user.png';
import cancleUrl from '../assets/img/cancle.png';

import Login from './Login.vue';

const target = ref(null);

const isShow = ref(false);

// click it in out
onClickOutside(target, () => {
  isShow.value = false;
});
</script>

<style scoped lang="less">
.header-right {
  position: relative;
  color: #000;
}
.header-right-content {
  position: absolute;
  box-sizing: border-box;
  bottom: calc(43px - 100vh);
  width: 300px;
  height: 100vh;
  background-color: #fff;
  transition: all linear 0.3s;
  z-index: 99;
  padding: 10px;
  .header-right-content-wallpaper {
    img {
      width: 280px;
      height: 160px;
      margin-top: 10px;
    }
    .header-right-content-wallpaper-control {
      button,
      label {
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
      label {
        font-size: 14px;
      }
      input {
        display: none;
      }
    }
  }
}
.show {
  right: -10px;
}
.hidder {
  right: -310px;
}
</style>
