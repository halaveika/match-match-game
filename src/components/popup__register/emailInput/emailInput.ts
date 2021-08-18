import { Input } from '../../input';

export class EmailInput extends Input {
  constructor() {
    super('input', ['email'], 'text');
    this.element.id = 'email';
  }
}
