export default (data: any, store: any) => {
  const { blur, radius, bgImage, menu, searchOri } = data;
  // 回复数据
  store.blur = blur;
  store.radius = radius;
  store.WallpaperImgUlr = bgImage;
  store.muenSource = menu;

  // 持久化数据
  localStorage.setItem('blur', blur);
  localStorage.setItem('radius', radius);
  localStorage.setItem('bgImage', bgImage);
  localStorage.setItem('menu', JSON.stringify(menu));
};