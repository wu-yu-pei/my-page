import axios from 'axios';
export function getRandomImg() {
  return 'http://wuyupei.top:8888/upload/' + Math.floor(Math.random() * 23) + '.jpg';
}

export async function uploadImage(formData: any) {
  let res = await axios.post('http://wuyupei.top:8888/upload', formData);
  return 'http://wuyupei.top:8888/upload/' + res.data.filename;
}
