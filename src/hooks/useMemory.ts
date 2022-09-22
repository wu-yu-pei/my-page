import { nextTick } from 'vue';
import { beifenData } from '../api';
import Message from '../components/Message';

export default async function useMemory() {
  if (!localStorage.getItem('userId')) {
    await nextTick();
    new Message({
      type: 'error',
      message: '未登录',
    });
    return;
  }
  const data = {
    bgImage: localStorage.getItem('bgImage'),
    blur: localStorage.getItem('blur'),
    redius: localStorage.getItem('radius'),
    menu: localStorage.getItem('menu'),
    userId: localStorage.getItem('userId'),
    isOpenCanvas: localStorage.getItem('isOpenCanvas'),
  };
  const res = await beifenData(data);
  if (res.data.length === 1) {
    await nextTick();
    new Message({
      type: 'success',
      message: '备份成功',
    });
  } else {
    new Message({
      type: 'error',
      message: '备份失败',
    });
  }
}
