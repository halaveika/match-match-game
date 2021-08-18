import './header__item-logo.scss';
import { BaseComponent } from '../base-component';

export class HeaderItemLogo extends BaseComponent {
  constructor() {
    super('li', ['header__item-logo']);
    this.element.innerHTML = `
    <span class="logo-top">match</span>
    <span class="logo-bottom">match</span>
  `;
  }
}
