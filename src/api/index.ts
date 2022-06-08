import axios from 'axios';
import Message from '../components/Message';

const proBaseUrl = import.meta.env.VITE_APP_BASE_URL;


axios.defaults.baseURL = proBaseUrl;

export function getRandomImg() {
  return `${proBaseUrl}/upload/` + Math.floor(Math.random() * 23) + '.jpg';
}

export async function uploadImage(formData: any) {
  let res = await axios.post('/upload', formData);
  return `${proBaseUrl}/upload/` + res.data.filename;
}

export async function getShareDataUrl(formData: any) {
  let res;
  try {
    res = await axios.post('/upload', formData);
  } catch (error) {
    return 'error';
  }
  const { filename } = res.data;

  return `你的分享链接为: ${proBaseUrl}/upload/${filename}`;
}

export async function getShareData(url: string) {
  let res: any;
  try {
    res = await axios.get(url);
  } catch (error) {
    if ((error as any).response.status == 404) {
      new Message({
        type: 'error',
        message: '链接无效',
      });
      // todo 消息框
      return;
    }
  }
  return res!.data;
}

// 关键词
export async function getKeyWord(keyword: string) {
  let res = await axios.get(`/keyword`, {
    params: { keyword },
  });
  return res.data;
}

// 二维码
export async function getQr() {
  let res = await axios.get('/qr');
  return res;
}

export async function check(scene_id: any) {
  let res = await axios.get('/check', {
    params: {
      scene_id,
    },
  });
  return res;
}

export async function getUserInfo(userId: any): Promise<any> {
  let res = await axios.get('/userinfo', {
    params: {
      userId,
    },
  });
  return res;
}

export async function beifenData(data: any) {
  let res = await axios.post('/beifen', data);
  return res;
}
// 聊天记录
export async function getCheat() {
  let res = await axios.get('/cheat');
  return res;
}

// 在线人数

export async function getUserNumber() {
  return await axios.get('/usersnumber');
}
