<template>
  <div class="user">
    <div class="user-info">
      <img src="http://wuyupei.top:8888/upload/user.jpg" alt="" />
      <div class="user-info-name">Welcome You</div>
    </div>
    <!-- <div class="user-login">
      <div class="user-login-panel">
        <h3>登录</h3>
        <div class="login">
          <p><span>账 号:</span> <input type="text" name="" id="" /></p>
          <p><span>密 码:</span> <input type="password" name="" id="" /></p>
          <button>登录</button>
        </div>
        <h3>注册</h3>
        <div class="register">
          <p><span>账 号:</span> <input type="text" name="" id="" /></p>
          <p><span>密 码:</span> <input type="password" name="" id="" /></p>
          <p><span>邮 箱:</span> <input type="text" name="" id="" /></p>
          <p>
            <span>验证码:</span> <input type="text" name="" id="" /><span
              class="code"
              @click="getVerCode"
              v-html="code"
            ></span>
          </p>
          <button>注册</button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
// import { register, getCode } from '../api/index';
// register('wuyupei', '19781209Wyp', '495174699@qq.com');

// const code = ref();

// // get code
// function getVerCode() {
//   getCode().then((res) => {
//     code.value = res;
//   });
// }
// getVerCode();
</script>

<style scoped lang="less">
.user {
  width: 100%;
  .user-info {
    display: flex;
    align-items: center;
    height: 50px;
    gap: 0 50px;
    margin: 10px 0;
    img {
      width: 50px;
      height: 50px;
      border: 1px solid #000;
      border-radius: 5px;
    }
  }
  .user-login {
    margin-top: 10px;
    .user-login-panel {
      > h3 {
        margin: 10px 0;
        font-size: 22px;
        font-weight: normal;
      }
      > div {
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        p {
          margin: 5px 0;
          span {
            display: inline-block;
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
  > div
  > div.register
  > p:nth-child(4)
  > input[type='text'] {
  width: 50px;
}
</style>
