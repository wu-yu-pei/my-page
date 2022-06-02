import { defineStore } from 'pinia';
import SocketIO from 'socket.io-client';
import { Document } from '../config/bodyconfig';

const useMainStore = defineStore('Main', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      WallpaperImgUlr:
        localStorage.getItem('bgImage') || 'http://wuyupei.top:8888/upload/default.jpg',
      blur: Number(localStorage.getItem('blur')) || 0,
      radius: Number(localStorage.getItem('radius')) || 0,
      muenSource:
        (localStorage.getItem('menu') && JSON.parse(localStorage.getItem('menu')!)) || Document,
      userId: localStorage.getItem('userId') || '',
      socket: SocketIO('http://wuyupei:8888', {
        autoConnect: false, // 自动连接
      }),
      onlineUser: 0,
    };
  },
});

export default useMainStore;
