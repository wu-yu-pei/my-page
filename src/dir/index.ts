import { App } from 'vue';
import { getUserInfo } from '../api/index';
const cache = new Map();
export default (app: App) => {
  app.directive('loaduserimg', async (el: HTMLElement, { arg, value }) => {
    if (cache.has(value)) {
      el.setAttribute('src', cache.get(value));
      return;
    } else {
      let res = await getUserInfo(value);
      const userImg = res.data.userImg;
      cache.set(value, userImg);
      el.setAttribute('src', userImg);
    }
  });
};
