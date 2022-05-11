<template>
  <div class="user">
    <div class="user-info">
      <img src="" alt="" />
      <div class="user-info-name">Wuyupei</div>
    </div>
    <div class="user-login">
      <div class="user-login-control">
        <div class="login" @click="handleClick(0)" :class="{ active: active == 0 }">登录</div>
        <div class="register" @click="handleClick(1)" :class="{ active: active == 1 }">注册</div>
      </div>
      <div class="user-login-panel">
        <div class="login" :class="{ show: active == 0 }">
          <p><span>账 号:</span> <input type="text" name="" id="" /></p>
          <p><span>密 码:</span> <input type="password" name="" id="" /></p>
          <button>登录</button>
        </div>
        <div class="register" :class="{ show: active == 1 }">
          <p><span>账 号:</span> <input type="text" name="" id="" /></p>
          <p><span>密 码:</span> <input type="password" name="" id="" /></p>
          <p><span>验证码:</span> <input type="text" name="" id="" /><span class="code"></span></p>
          <button>注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, version } from 'vue';
import { register, getCode } from '../api/index';
register('wuyupei', '19781209Wyp', '495174699@qq.com');

const active = ref(0);
const code = ref();

const handleClick = (index: any) => {
  index == 0 ? (active.value = 0) : (active.value = 1);
};

// async function Verifycode() {
//   const code = await getCode();
//   return code;
// }
// code.value = Verifycode();
getCode().then((res) => {
  code.value = res;
});
</script>

<style scoped lang="less">
.user {
  width: 100%;
  height: 300px;
  border: 1px solid #000;
  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 50px;
    img {
      width: 50px;
      height: 50px;
    }
    // user-info-name {
    // }
  }
  .user-login {
    margin-top: 10px;
    .user-login-control {
      display: flex;
      align-items: center;
      height: 40px;
      div {
        flex: 1;
        height: 100%;
        line-height: 40px;
        text-align: center;

        background-color: #fff;
        color: #000;
        &.active {
          background-color: #000;
          color: #fff;
        }
      }
    }
    .user-login-panel {
      position: relative;
      display: flex;
      > div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 200px;
        z-index: 10;
        background-color: #fff;
        &.show {
          z-index: 11;
        }
        p {
          margin: 5px 0;
          display: flex;
          justify-content: center;
          span {
            display: inline-block;
            text-align: center;
            width: 60px;
            line-height: 32px;
          }
          .code {
            width: 100px;
            margin-left: 10px;
            height: 32px;
          }
          input {
            padding: 0 5px;
            outline: none;
            height: 30px;
            border: 1px solid #000;
          }
        }
        button {
          border: none;
          padding: 10px;
          width: 100%;
          background-color: #fff;
          margin-right: 10px;
          text-align: center;
          cursor: pointer;
          &:hover {
            background: #000;
            color: #fff;
          }
        }
      }
    }
  }
}
#app
  > div
  > div
  > div.header
  > div.header-right
  > div.header-right-content.show
  > div
  > div.user-login
  > div.user-login-panel
  > div.register.show
  > p:nth-child(3)
  > input[type='text'] {
  width: 50px;
}
</style>
