import { defineStore } from 'pinia';

const useMainStore = defineStore('Main', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      WallpaperImgUlr:
        localStorage.getItem('bg-image') || 'https://jiangly.com/_nuxt/img/banner_111.a6be22c.gif',
    };
  },
});

export default useMainStore;
