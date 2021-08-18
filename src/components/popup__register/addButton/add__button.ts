import { Input } from '../../input';

export class AddButton extends Input {
  constructor() {
    super('input', ['add'], 'submit');
    this.element.value = 'add user';
  }
}
