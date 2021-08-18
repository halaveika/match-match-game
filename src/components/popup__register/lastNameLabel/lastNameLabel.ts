import { BaseComponent } from '../../base-component';

export class LastNameLabel extends BaseComponent {
  constructor() {
    super('label', ['input-label']);
    this.element.innerHTML = 'Last Name';
    this.element.setAttribute('for', 'last-name');
  }
}
