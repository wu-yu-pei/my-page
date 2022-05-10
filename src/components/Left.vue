<template>
  <div class="header-left">
    <div class="header-left-control">
      <img @click="isShow = !isShow" :src="!isShow ? menuUrl : cancleUrl" alt="" />
    </div>
    <div class="header-left-content" :class="{ show: isShow, hidder: !isShow }" ref="target">
      <!-- 壁纸 -->
      <div class="header-left-content-wallpaper">
        <h3>壁纸</h3>
        <img :src="store.$state.WallpaperImgUlr" alt="" />
        <div class="header-left-content-wallpaper-control">
          <button @click="changeWallpaperRandom">随机切换</button>
          <label for="file">本地壁纸</label>
          <input id="file" type="file" @click="changeWallpaperUpload" />
        </div>
      </div>
      <!-- 背景模糊 -->
      <div class="header-left-content-bgfilter">
        <h3>背景模糊</h3>
        <Slider
          :value="store.blur"
          @update="
            (value) => {
              store.blur = value;
            }
          "
          width="100%"
        ></Slider>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

import menuUrl from '../assets/img/menu.png';
import cancleUrl from '../assets/img/cancle.png';

import Slider from './Slider.vue';

import { getRandomImg, uploadImage } from '../api/index';
import useMainStore from '../store';

const store = useMainStore();
const target = ref(null);

const isShow = ref(false);
const wallpaperImgUrl = ref('');
// 随机切换壁纸
const changeWallpaperRandom = () => {
  const url = getRandomImg();
  wallpaperImgUrl.value = url;
  store.$state.WallpaperImgUlr = url;
  localStorage.setItem('bg-image', url);
};

// 上传本地壁纸
const changeWallpaperUpload = () => {
  const file: HTMLFormElement = document.querySelector('#file')!;

  file.addEventListener('change', async (e) => {
    const formData = new FormData();
    formData.append('file', file.files[0]);
    const imgUrl = await uploadImage(formData);
    store.$state.WallpaperImgUlr = imgUrl;

    localStorage.setItem('bg-image', imgUrl);
  });
};

// 在..外点击
onClickOutside(target, () => {
  isShow.value = false;
});
</script>

<style scoped lang="less">
.header-left {
  position: relative;
  color: #000;
}
.header-left-content {
  position: absolute;
  box-sizing: border-box;
  bottom: calc(43px - 100vh);
  width: 300px;
  height: 100vh;
  background-color: #fff;
  transition: all linear 0.3s;
  z-index: 99;
  padding: 10px;
  & > div {
    margin: 10px 0;
  }
  & > div > h3 {
    font-size: 22px;
    font-weight: normal;
  }
  .header-left-content-wallpaper {
    img {
      width: 280px;
      height: 160px;
      margin-top: 10px;
    }
    .header-left-content-wallpaper-control {
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
  left: -10px;
}
.hidder {
  left: -310px;
}
</style>
