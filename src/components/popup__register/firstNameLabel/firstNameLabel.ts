import { BaseComponent } from '../../base-component';

export class FirstNameLabel extends BaseComponent {
  constructor() {
    super('label', ['input-label']);
    this.element.innerHTML = 'First Name';
    this.element.setAttribute('for', 'first-name');
  }
}
