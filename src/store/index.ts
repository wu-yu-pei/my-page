import { defineStore } from 'pinia';
import { Document } from '../config/bodyconfig';

export interface MainState {
  WallpaperImgUlr: string;
  blur: number;
  radius: number;
  muenSource: object;
}

const useMainStore = defineStore('Main', {
  // arrow function recommended for full type inference
  state: (): MainState => {
    return {
      WallpaperImgUlr:
        localStorage.getItem('bgImage') || 'http://wuyupei.top:8888/upload/default.jpg',
      blur: Number(localStorage.getItem('blur')) || 0,
      radius: Number(localStorage.getItem('radius')) || 0,
      muenSource:
        (localStorage.getItem('menu') && JSON.parse(localStorage.getItem('menu')!)) || Document,
    };
  },
});

export default useMainStore;

// https://jiangly.com/_nuxt/img/banner_111.a6be22c.gif
