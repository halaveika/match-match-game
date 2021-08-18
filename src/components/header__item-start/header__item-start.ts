import './header__item-start.scss';
import { BaseComponent } from '../base-component';

export class HeaderItemStart extends BaseComponent {
  constructor() {
    super('li', ['header__item-start', 'hide']);
    this.element.setAttribute('onclick', "location.href='#/start'");
    this.element.innerHTML = `
    <span class="nav_item-text" id="start">start game</span>
  `;
  }
}
