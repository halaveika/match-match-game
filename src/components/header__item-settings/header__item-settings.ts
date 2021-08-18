import './header__item-settings.scss';
import { BaseComponent } from '../base-component';

export class HeaderItemSettings extends BaseComponent {
  constructor() {
    super('li', ['header__item-settings']);
    this.element.setAttribute('style', 'cursor:pointer');
    this.element.innerHTML = `
    <span class="nav_item-text disable">Game Settings</span>
  `;
  }
}
