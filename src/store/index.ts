import { defineStore } from 'pinia';
import SocketIO from 'socket.io-client';
import { Document } from '../config/bodyconfig';

const proBaseUrl = import.meta.env.VITE_APP_BASE_URL;

const useMainStore = defineStore('Main', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      WallpaperImgUlr: localStorage.getItem('bgImage') || proBaseUrl + '/upload/8.jpg',
      blur: Number(localStorage.getItem('blur')) || 10,
      radius: Number(localStorage.getItem('radius')) || 0,
      muenSource: (localStorage.getItem('menu') && JSON.parse(localStorage.getItem('menu')!)) || Document,
      userId: localStorage.getItem('userId') || '',
      socket: SocketIO(proBaseUrl, {
        autoConnect: false, // 自动连接
      }),
      onlineUser: 0,
      userimg: '',
      isOpenCanvas: JSON.parse(localStorage.getItem('isOpenCanvas')!) || false,
    };
  },
});

export default useMainStore;
