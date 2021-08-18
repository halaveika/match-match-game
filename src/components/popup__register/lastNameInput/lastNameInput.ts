import { Input } from '../../input';

export class LastNameInput extends Input {
  constructor() {
    super('input', ['last-name'], 'text');
    this.element.id = 'last-name';
  }
}
