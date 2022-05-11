import axios from 'axios';
const devBaseUrl = 'http://localhost:8888';
const proBaseUrl = 'http://wuyupei.top:8888';

axios.defaults.baseURL = proBaseUrl;

export function getRandomImg() {
  return `${proBaseUrl}/upload/` + Math.floor(Math.random() * 23) + '.jpg';
}

export async function uploadImage(formData: any) {
  let res = await axios.post('/upload', formData);
  return `${proBaseUrl}/upload/` + res.data.filename;
}

export async function register(account: string, password: string, mail: string) {
  let res = await axios.post('/register', { account, password, mail });
  console.log(res);
}

export async function login(account: string, password: string) {
  let res = await axios.post('/login', { account, password });
  console.log(res);
}

export async function getCode() {
  let res = await axios.get('/code');
  return res.data.code;
}
