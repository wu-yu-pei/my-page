<template>
  <div class="chect">
    <h3>聊天大厅</h3>
    <div class="chect-content">
      <div v-for="(item, index) in messages">
        <div class="self" v-if="item.from == self">
          <img :src="item.img" alt="" />
          <div class="self-content">{{ item.message }}</div>
        </div>
        <div class="outher" v-else>
          <img :src="item.img" alt="" />
          <div class="self-content">{{ item.message }}</div>
        </div>
      </div>
    </div>
    <div class="chect-control">
      <input v-model="inputValue" type="text" />
      <button @click="send">发送</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import SocketIO from 'socket.io-client';
import useMainStore from '../store';
import { getCheat } from '../api/index';

const messages = ref<any[]>([]);
const inputValue = ref('');
getCheat().then((res) => {
  console.log(res);

  messages.value = res.data;
});

const mainStroe = useMainStore();
const state = toRefs(mainStroe);

const self = state.userId;
console.log(self);

const socketOptions = {
  autoConnect: true, // 自动连接
};
//建立websocket连接
var socket = SocketIO('http://localhost:8888', socketOptions);

//接受服务端发来的消息
socket.on('guangbo', (data: any) => {
  messages.value.push(data);
});

const send = () => {
  if (!self.value) {
    inputValue.value = '';
    return alert('请使用微信登录!');
  }
  if (inputValue.value.trim() == '') {
    return;
  }
  const message = {
    from: localStorage.getItem('userId'),
    name: localStorage.getItem('userName'),
    img: localStorage.getItem('bgImage'),
    message: inputValue.value,
  };
  messages.value.push(message);

  socket.emit('message', message);
  inputValue.value = '';
};
</script>

<style scoped lang="less">
.chect {
  display: flex;
  flex: 1;
  flex-direction: column;
  h3 {
    font-size: 22px;
    font-weight: normal;
    margin: 10px 0;
  }
  .chect-content {
    flex: 1;
    border: 1px solid #000;
    border-bottom: none;
    overflow-y: auto;
    padding: 0 5px;
    font-family: cursive;
    background-color: #f5f5f5;
    .self {
      display: flex;
      flex-direction: row-reverse;
      margin: 10px 0;
      img {
        width: 30px;
        height: 30px;
        margin-left: 5px;
        border-radius: 50%;
      }
      .self-content {
        position: relative;
        border-radius: 5px;
        background: #30ff30;
        padding: 6px 10px;
        max-width: 180px;
        &::after {
          position: absolute;
          content: '';
          top: 1px;
          right: -14px;
          border: 10px solid transparent;
          border-left: 10px solid #30ff30;
        }
      }
    }
    .outher {
      display: flex;
      margin: 10px 0;
      img {
        width: 30px;
        height: 30px;
        margin-right: 5px;
        border-radius: 50%;
      }
      .self-content {
        position: relative;
        border-radius: 5px;
        background-color: #fff;
        padding: 6px 10px;
        max-width: 180px;
        &::after {
          position: absolute;
          content: '';
          top: 1px;
          left: -14px;
          border: 10px solid transparent;
          border-right: 10px solid #fff;
        }
      }
    }
  }
  .chect-control {
    width: 100%;
    display: flex;
    box-shadow: 0 -4px 12px #c3abab;
    input {
      outline: none;
      height: 25px;
      flex: 5;
      border: 1px solid #000;
    }
    button {
      flex: 1;
      box-sizing: content-box;
      padding: 2px 10px;
      background-color: #fff;
      cursor: pointer;
      border: 1px solid #000;
      border-left: none;
      &:hover {
        background-color: #000;
        color: #fff;
      }
    }
  }
}
</style>
