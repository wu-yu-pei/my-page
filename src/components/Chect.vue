<template>
  <div class="chect">
    <h3>聊天大厅</h3>
    <div class="chect-content" ref="contentEl">
      <div v-for="(item, index) in messages">
        <div class="self" v-if="item.from == self">
          <img :src="item.img" alt="" />
          <div class="self-content">{{ item.message }}</div>
        </div>
        <div v-else-if="item.type == 'date'" class="time">
          <span>{{ item.date }}</span>
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
import { ref, toRefs, nextTick } from 'vue';
import SocketIO from 'socket.io-client';
import useMainStore from '../store';
import { getCheat } from '../api/index';

const messages = ref<any[]>([]);
const contentEl = ref<InstanceType<typeof HTMLDivElement>>();
const inputValue = ref('');

getCheat().then(async (res) => {
  messages.value = res.data;
  await nextTick();
  contentEl.value!.scrollTop = contentEl.value!.scrollHeight;
});

const mainStroe = useMainStore();
const state = toRefs(mainStroe);

const self = state.userId;

const socketOptions = {
  autoConnect: true, // 自动连接
};
//建立websocket连接
var socket = SocketIO('http://wuyupei.top:8888', socketOptions);

//接受服务端发来的消息
socket.on('guangbo', (data: any) => {
  messages.value.push(data);
});

const send = async () => {
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
    date: +new Date(),
  };

  if (
    message.date -
      (messages.value[messages.value.length - 1] &&
        messages.value[messages.value.length - 1].date) >
    1000 * 60 * 10
  ) {
    const timeMessage = {
      type: 'date',
      date: new Date(message.date).toLocaleString(),
    };
    // 时间
    messages.value.push(timeMessage);
    socket.emit('message', timeMessage);
  }

  // 聊天信息
  messages.value.push(message);
  socket.emit('message', message);
  inputValue.value = '';
  await nextTick();
  contentEl.value!.scrollTop = contentEl.value!.scrollHeight;
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
    max-height: 534px;
    border: 1px solid #000;
    border-bottom: none;
    overflow-y: auto;
    overflow-x: hidden;
    word-break: break-all;
    padding: 0 5px;
    font-family: cursive;
    background-color: #f5f5f5;
    .time {
      text-align: center;
      span {
        background-color: #ccc;
        font-size: 12px;
        padding: 5px 5px;
        color: #fff;
      }
    }
    &::-webkit-scrollbar {
      background-color: #fff;
      width: 4px;
      overflow: visible;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #0c2135;
      border-radius: 0;
    }
    &::-webkit-scrollbar-button {
      background-color: #2474b5;
      width: 0px;
      height: 0px;
    }
    &::-webkit-scrollbar-corner {
      background-color: black;
    }
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
