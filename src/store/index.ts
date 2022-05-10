import { defineStore } from 'pinia';
import { Document } from '../config/bodyconfig';

const useMainStore = defineStore('Main', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      WallpaperImgUlr:
        localStorage.getItem('bg-image') || 'https://jiangly.com/_nuxt/img/banner_111.a6be22c.gif',
      blur: Number(localStorage.getItem('blur')) || 0,
      radius: Number(localStorage.getItem('radius')) || 0,
      muenSource:
        (localStorage.getItem('menu') && JSON.parse(localStorage.getItem('menu')!)) || Document,
    };
  },
});

export default useMainStore;
