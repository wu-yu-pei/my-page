import useMainStore from '../store';
export default (data: any) => {
  const store = useMainStore();
  const { blur, radius, bgImage, menu, searchOri } = data;
  // 回复数据
  store.blur = blur;
  store.radius = radius;
  store.WallpaperImgUlr = bgImage;
  store.muenSource = menu;

  // 持久化数据
  localStorage.setItem('blur', String(blur));
  localStorage.setItem('radius', String(radius));
  localStorage.setItem('bgImage', bgImage);
  localStorage.setItem('menu', JSON.stringify(menu));
};
