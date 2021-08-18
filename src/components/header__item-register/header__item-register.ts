import './header__item-register.scss';
import { BaseComponent } from '../base-component';

export class HeaderItemRegister extends BaseComponent {
  constructor() {
    super('li', ['header__item-register']);
    this.element.setAttribute('style', 'cursor:pointer');
    this.element.innerHTML = `
    <span class="nav_item-text">register new player</span>
  `;
  }
}
