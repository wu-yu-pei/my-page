type PropsType = {
  type: string;
  message: string;
  time?: number;
};

import errorImg from '../assets/img/error.png';
import success from '../assets/img/success.png';

class Message {
  div: HTMLDivElement | null;
  constructor(props: PropsType) {
    const img = document.createElement('img');
    img.style.verticalAlign = 'middle';
    img.style.margin = '0 10px';

    img.src = props.type == 'error' ? errorImg : success;

    this.div = document.createElement('div');

    this.div.appendChild(img);
    this.div.innerHTML += props.message;

    this.div.style.position = 'fixed';
    this.div.style.top = '50%';
    this.div.style.left = '50%';
    this.div.style.transform = 'translate(-50%, -50%)';

    // todo 加上渐变效果
    // this.div.style.transition = 'all 0.5s learn';

    this.div.style.backgroundColor = '#fff';
    this.div.style.padding = '0px 15px';
    this.div.style.borderRadius = '5px';

    this.div.style.color = '#000';
    this.div.style.letterSpacing = '3px';
    this.div.style.wordBreak = 'break-all';
    this.div.style.lineHeight = '40px';
    this.div.style.border = '1px solid #000';

    document.body.appendChild(this.div);

    setTimeout(() => {
      document.body.removeChild(this.div as Node);
    }, props.time || 1500);
  }
}

export default Message;
