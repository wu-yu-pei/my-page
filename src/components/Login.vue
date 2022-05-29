<template>
  <div class="user">
    <div class="user-info">
      <template v-if="isLogin">
        <img src="http://wuyupei.top:8888/upload/user.jpg" alt="" ref="userImgEl" />
        <div class="user-info-name">{{ userName }}</div>
        <button @click="out">退出登录</button>
      </template>
      <template v-else>
        <img src="../assets/img/qr.png" alt="" @click="getQrImg" />
        <div class="user-info-name">点击左侧,微信扫码登录</div>
        <img src="" alt="" class="qr" ref="qrEl" :style="{ display: qrShow ? 'block' : 'none' }" />
        <img
          src="../assets/img/out.png"
          alt=""
          class="out"
          :style="{ display: outShow ? 'block' : 'none' }"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getQr, check, getUserInfo } from '../api/index';
import loadingImg from '../assets/img/loading.svg';
import useMainStore from '../store';

const qrEl = ref<HTMLImageElement>()!;
const userImgEl = ref<HTMLImageElement>()!;
const outShow = ref(false);
const qrShow = ref(false);
const isLogin = ref(false);
const scene_id = ref(null);
const userName = ref(localStorage.getItem('userName')) || ref('');
const mainStore = useMainStore();
const timerOut = ref();

const userId = localStorage.getItem('userId');

if (userId) {
  // 去获取用户信息
  isLogin.value = true;
}

const getQrImg = async () => {
  // 显示二维码
  outShow.value = false;
  //
  qrShow.value = true;
  qrEl.value!.setAttribute('src', loadingImg);
  let res = await getQr();
  qrEl.value!.setAttribute('src', res.data.url);
  scene_id.value = res.data.scene_id;
  // 过期后显示过期
  timerOut.value = setTimeout(() => {
    outShow.value = true;
  }, 1000 * 120);
  // 轮询
  const timer = setInterval(async () => {
    let res = await check(scene_id.value);
    // 登录成功
    if (res.data.status === 1) {
      // 储存用户信息
      localStorage.setItem('userId', res.data.userInfo.openId);
      localStorage.setItem('userName', res.data.userInfo.userName);

      isLogin.value = true;
      userName.value = res.data.userInfo.userName;
      userImgEl.value?.setAttribute('src', res.data.userInfo.userImg);

      clearInterval(timer);
      clearTimeout(timerOut.value);
      // 获取用户个人信息及配置信息
      const result = await getUserInfo(res.data.userInfo.openId);
      const { bgImage, blur, redius, menu, openId } = result.data;

      mainStore.WallpaperImgUlr = bgImage;
      mainStore.blur = blur;
      mainStore.radius = redius;
      mainStore.muenSource = menu;
      mainStore.userId = openId;

      localStorage.setItem('bgImage', bgImage);
      localStorage.setItem('blur', blur);
      localStorage.setItem('radius', redius);
      localStorage.setItem('menu', JSON.stringify(menu));
    }
  }, 2000);
};

const out = async () => {
  isLogin.value = false;
  qrShow.value = false;
  clearTimeout(timerOut.value);
  mainStore.userId = '';
  localStorage.removeItem('userId');
};
</script>

<style scoped lang="less">
.user {
  width: 100%;
  .user-info {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    // height: 50px;
    height: 100%;
    gap: 0 50px;
    margin: 10px 0;
    img {
      width: 50px;
      height: 50px;
      border: 1px solid #000;
      border-radius: 5px;
    }
    button {
      width: 100%;
      height: 40px;
      background-color: #000;
      color: #fff;
      margin: 10px 0;
      letter-spacing: 5px;
      cursor: pointer;
    }
    .qr {
      margin-top: 15px;
      width: 270px;
      height: 270px;
    }
    .out {
      top: 112px;
      left: 38px;
      width: 200px;
      height: 172px;
      position: absolute;
    }
  }
  .user-login {
    h3 {
      font-size: 22px;
      font-weight: normal;
    }
  }
}
</style>
