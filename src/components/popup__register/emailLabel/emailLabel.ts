import { BaseComponent } from '../../base-component';

export class EmailLabel extends BaseComponent {
  constructor() {
    super('label', ['input-label']);
    this.element.innerHTML = 'E-mail';
    this.element.setAttribute('for', 'email');
  }
}
