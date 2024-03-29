import { getUserInfo } from '../api/index';
import useMainStore from '../store/index';

export default async function (userOpenId: any) {
  const mainStore = useMainStore();
  const result = await getUserInfo(userOpenId);
  const {
    bgImage,
    blur,
    redius,
    menu,
    openId,
    isOpenCanvas = JSON.parse(localStorage.getItem('isOpenCanvas')!),
  } = result.data;

  mainStore.WallpaperImgUlr = bgImage;
  mainStore.blur = blur;
  mainStore.radius = redius;
  mainStore.muenSource = menu;
  mainStore.userId = openId;
  mainStore.isOpenCanvas = isOpenCanvas;

  localStorage.setItem('bgImage', bgImage);
  localStorage.setItem('blur', blur);
  localStorage.setItem('radius', redius);
  localStorage.setItem('menu', JSON.stringify(menu));
  localStorage.setItem('isOpenCanvas', isOpenCanvas);
}
