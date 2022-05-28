<template>
  <div class="user">
    <div class="user-info">
      <template v-if="false">
        <img src="http://wuyupei.top:8888/upload/user.jpg" alt="" />
        <div class="user-info-name">Welcome You</div>
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
import { getQr, check } from '../api/index';
import loadingImg from '../assets/img/loading.svg';

const qrEl = ref<HTMLImageElement>()!;
const outShow = ref(false);
const qrShow = ref(false);
const scene_id = ref(null);
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
  setTimeout(() => {
    outShow.value = true;
  }, 1000 * 60);
  // 轮询
  const timer = setInterval(async () => {
    let res = await check(scene_id.value);
    if (res.data.status === 1) {
      console.log('校验成功');

      clearInterval(timer);
    }
  }, 1000);
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
    height: 50px;
    gap: 0 50px;
    margin: 10px 0;
    img {
      width: 50px;
      height: 50px;
      border: 1px solid #000;
      border-radius: 5px;
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
