import './header__item-about.scss';
import { BaseComponent } from '../base-component';

export class HeaderItemAbout extends BaseComponent {
  constructor() {
    super('li', ['header__item-about', 'active']);
    this.element.setAttribute('style', 'cursor:pointer');
    this.element.innerHTML = `
    <div ></div>
    <span class="nav_item-text disable">About Game</span>
  `;
  }
}
