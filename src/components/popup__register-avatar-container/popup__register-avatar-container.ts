import './popup__register-avatar-container.scss';
import { BaseComponent } from '../base-component';
import { AvatarInput } from '../popup__register-avatar-input/popup__register-avatar-input';
import { PopupRegisterAvatar } from '../popup__register-avatar/popup__register-avatar';

export class AvatarContainer extends BaseComponent {
  defaultImage: string;

  readonly input: AvatarInput;

  readonly avatarCanvas: PopupRegisterAvatar;

  constructor() {
    super('label', ['popup__register-avatar-container']);
    this.input = new AvatarInput();
    this.element.appendChild(this.input.element);
    this.defaultImage = this.element.style.backgroundImage;
    this.avatarCanvas = new PopupRegisterAvatar();
    this.input.element.addEventListener('change', () => {
      this.avatarCanvas.addUserAvatar(<HTMLInputElement> this.input.element);
    });
  }
}
