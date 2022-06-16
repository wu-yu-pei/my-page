<template>
  <div class="user">
    <div class="user-info">
      <template v-if="isLogin">
        <div class="user-img">
          <img :src="mainStore.userimg" alt="" ref="userImgEl" />
          <label for="userimg" alt="" />
          <input
            type="file"
            style="display: none"
            @change="changeUserImg"
            id="userimg"
            ref="uploadEl"
          />
        </div>
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
import { getQr, check, getUserNumber, uploadImage, getUserInfo, changeImg } from '../api/index';
import loadingImg from '../assets/img/loading.svg';
import useMainStore from '../store';
import useSyncConfing from '../hooks/useSyncConfig';

const qrEl = ref<HTMLImageElement>()!;
const userImgEl = ref<HTMLImageElement>()!;
const uploadEl = ref<HTMLInputElement>()!;
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
  getUserInfo(userId).then((res) => {
    mainStore.userimg = res.data.userImg;
  });
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
      mainStore.userimg = res.data.userInfo.userImg;

      clearInterval(timer);
      clearTimeout(timerOut.value);

      // 获取用户个人信息及配置信息
      useSyncConfing(res.data.userInfo.openId);
      // 登录成功建立连接
      mainStore.socket.connect();
    }
  }, 2000);
};

// 修改用户图像
const changeUserImg = async () => {
  // 上传图像
  const file = uploadEl.value?.files!;
  const formdate = new FormData();
  formdate.append('file', file[0]);
  const url = await uploadImage(formdate);
  mainStore.userimg = url;
  // 修改图像
  const res = await changeImg(userId as string, url);
};

const out = async () => {
  isLogin.value = false;
  qrShow.value = false;
  mainStore.socket.disconnect();
  getUserNumber().then((res) => {
    mainStore.onlineUser = res.data.data;
  });
  clearTimeout(timerOut.value);
  mainStore.userId = '';
  localStorage.removeItem('userId');
};
</script>

<style scoped lang="less">
.user {
  width: 100%;
  .user-info {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    gap: 0 50px;
    margin: 10px 0;
    .user-img {
      position: relative;
      width: 50px;
      height: 50px;
      img,
      label {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 5px;
        background-color: #fff;
        &:nth-child(1) {
          z-index: 2;
        }
        &:nth-child(2) {
          z-index: 1;
        }
      }
      label {
        background-image: url(../assets/img/edit.png);
      }
      &:hover img:nth-child(1) {
        z-index: 1;
      }
      &:hover label:nth-child(2) {
        z-index: 2;
        background-color: #ccc;
        opacity: 0.8;
      }
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
