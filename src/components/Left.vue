<template>
  <div class="header-left">
    <div class="header-left-control">
      <img @click="isShow = !isShow" :src="!isShow ? menuUrl : cancleUrl" alt="" />
    </div>
    <div class="header-left-content" :class="{ show: isShow, hidder: !isShow }" ref="target">
      <!-- 壁纸 -->
      <div class="header-left-content-wallpaper">
        <h3>背景壁纸</h3>
        <img :src="store.$state.WallpaperImgUlr" alt="" />
        <div class="header-left-content-wallpaper-control">
          <button @click="changeWallpaperRandom">随机切换</button>
          <label for="file">本地壁纸</label>
          <input id="file" type="file" @click="changeWallpaperUpload" />
          <button @click="setWallpaper">设置壁纸</button>
        </div>
      </div>
      <!-- 数据备份 -->
      <div class="header-left-content-data">
        <h3>数据备份</h3>
        <button @click="outputData">导出数据</button>
        <label for="files" @click="inputData">导入数据</label>
        <input id="files" type="file" @click="changeWallpaperUpload" />
      </div>
      <!-- 数据分享 -->
      <div class="header-left-content-data">
        <h3>数据共享</h3>
        <button @click="shareData">分享数据</button>
        <button @click="inputShareData">链接导入</button>
      </div>
      <!-- 模糊尺寸 -->
      <div class="header-left-content-bgfilter">
        <h3>背景模糊</h3>
        <Slider :value="store.blur" @update="updateBlur" width="100%"></Slider>
      </div>
      <!-- 圆角尺寸 -->
      <div class="header-left-content-borderrad">
        <h3>边缘圆角</h3>
        <Slider :value="store.radius" @update="updateRadius" :max="10" width="100%"></Slider>
      </div>
      <div class="header-left-content-data">
        <h3>微信备份</h3>
        <button @click="beifen">备份</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import * as FileSaver from 'file-saver';

import menuUrl from '../assets/img/menu.png';
import cancleUrl from '../assets/img/cancle.png';

import { getRandomImg, uploadImage, getShareDataUrl, getShareData, beifenData } from '../api/index';
import useInpuData from '../hooks/useInpuData';
import useMainStore from '../store';

import Slider from './Slider.vue';

const store = useMainStore();
const target = ref(null);
const isShow = ref(false);
const wallpaperImgUrl = ref('');

// change wallpaper readom
const changeWallpaperRandom = () => {
  const url = getRandomImg();
  wallpaperImgUrl.value = url;
  store.$state.WallpaperImgUlr = url;
  localStorage.setItem('bg-image', url);
};

//  upload local wallpaper
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

// set online wallpaper
const setWallpaper = () => {
  const imgUrl = prompt('请输入壁纸在线地址');

  if (!imgUrl?.trim()) return;

  store.$state.WallpaperImgUlr = imgUrl!;
  localStorage.setItem('bg-image', imgUrl!);
};

// output data
const outputData = () => {
  const menu = JSON.parse(localStorage.getItem('menu')!);
  const blur = localStorage.getItem('blur');
  const bgImage = localStorage.getItem('bgImage');
  const radius = localStorage.getItem('radius');
  const searchOri = JSON.parse(localStorage.getItem('searchOrigin')!);
  const data = {
    menu,
    blur,
    bgImage,
    radius,
    searchOri,
  };

  const blob = new Blob([JSON.stringify(data) as any], { type: '' });
  FileSaver.saveAs(blob, 'MyPageData.json');
};

// input data
const inputData = () => {
  const fileEL: HTMLFormElement = document.querySelector('#files')!;

  fileEL.addEventListener('change', async (e) => {
    const file = fileEL.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function () {
      const result = JSON.parse(this.result as string);
      useInpuData(result, store);
    };
  });
};

// share data
const shareData = async () => {
  const menu = JSON.parse(localStorage.getItem('menu')!);
  const blur = localStorage.getItem('blur');
  const bgImage = localStorage.getItem('bgImage');
  console.log(bgImage);

  const radius = localStorage.getItem('radius');
  const searchOri = JSON.parse(localStorage.getItem('searchOrigin')!);
  const data = {
    menu,
    blur,
    bgImage,
    radius,
    searchOri,
  };

  const file = new File([JSON.stringify(data) as any], 'a.json', {});
  const formdata = new FormData();
  formdata.append('file', file);

  const url = await getShareDataUrl(formdata);
  alert(url);
};

// input ShareData
const inputShareData = async () => {
  const url = prompt('请输入url')!;
  if (!url) return;
  const res = await getShareData(url);

  useInpuData(res, store);
};
// blur change
const updateBlur = (value: string) => {
  store.blur = Number(value);
  localStorage.setItem('blur', value);
};

// radius change
const updateRadius = (value: string) => {
  store.radius = Number(value);
  localStorage.setItem('radius', value);
};

const beifen = async () => {
  const data = {
    bgImage: localStorage.getItem('bgImage'),
    blur: localStorage.getItem('blur'),
    redius: localStorage.getItem('radius'),
    menu: localStorage.getItem('menu'),
    userId: localStorage.getItem('userId'),
  };
  const res = await beifenData(data);
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
    margin: 20px 0;
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
  .header-left-content-data {
    h3 {
      margin: 0 0 15px 0;
    }
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
.show {
  left: -10px;
}
.hidder {
  left: -310px;
}
</style>
