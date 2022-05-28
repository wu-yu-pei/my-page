import axios from 'axios';
const devBaseUrl = 'http://localhost:8888';
const proBaseUrl = 'http://127.0.0.1:8888' || 'http://wuyupei.top:8888';

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
      alert('链接无效');
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
// 登录注册
// export async function register(account: string, password: string, mail: string) {
//   let res = await axios.post('/register', { account, password, mail });
//   console.log(res);
// }

// export async function login(account: string, password: string) {
//   let res = await axios.post('/login', { account, password });
//   console.log(res);
// }

// export async function getCode() {
//   let res = await axios.get('/code');
//   return res.data.code;
// }
