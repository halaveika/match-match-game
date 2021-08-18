import './popup__register-avatar.scss';

export class PopupRegisterAvatar {
  element?: HTMLCanvasElement;

  viewImage(src: string): void {
    this.element = document.createElement('canvas');
    this.element.classList.add('popup__register-avatar');
    const canvas = this.element;
    const imgNew = new Image();
    imgNew.setAttribute('crossOrigin', 'anonymous');
    imgNew.src = `${new URL(src, import.meta.url)}`;
    imgNew.onload = (): void => {
      canvas.width = 198;
      canvas.height = 198;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No context in canvas tag');
      ctx.drawImage(
        imgNew,
        0,
        0,
        imgNew.width,
        imgNew.height,
        0,
        0,
        canvas.width,
        canvas.height,
      );
      const parentNode = document.querySelector(
        '.popup__register-avatar-container',
      );
      const img = <HTMLElement>parentNode;
      img.style.backgroundImage = `url(${canvas.toDataURL()})`;
      const inputFileNode = <HTMLInputElement>(
        document.querySelector('.popup__register-avatar-input')
      );
      inputFileNode.required = false;
      localStorage.setItem('avatar', canvas.toDataURL());
    };
  }

  addUserAvatar(input: HTMLInputElement): void {
    if (input.files === null) throw new Error('There is no input file');
    const file = input.files[0];
    if (
      file.type === 'image/jpg'
      || file.type === 'image/jpeg'
      || file.type === 'image/png'
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = <string>reader.result;
        this.viewImage(img.src);
        input.value = '';
      };
      reader.readAsDataURL(file);
    } else {
      throw new Error('Not valid file');
    }
  }
}
