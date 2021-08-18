import { BaseComponent } from '../../base-component';

export class CancelButton extends BaseComponent {
  constructor() {
    super('span', ['cancel']);
    this.element.innerHTML = 'cancel';
  }
}
