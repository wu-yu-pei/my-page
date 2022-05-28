import { defineStore } from 'pinia';
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
    };
  },
});

export default useMainStore;
