import { Input } from '../../input';

export class FirstNameInput extends Input {
  constructor() {
    super('input', ['first-name'], 'text');
    this.element.id = 'first-name';
  }
}
