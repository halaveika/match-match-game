import './popup__register-avatar-input.scss';
import { Input } from '../input';

export class AvatarInput extends Input {
  constructor() {
    super('input', ['popup__register-avatar-input'], 'file');
    this.element.required = true;
  }
}
