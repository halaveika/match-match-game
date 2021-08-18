import './header__item-score.scss';
import { BaseComponent } from '../base-component';

export class HeaderItemScore extends BaseComponent {
  constructor() {
    super('li', ['header__item-score']);
    this.element.innerHTML = `
    <span class="nav_item-text disable">Best Score</span>
  `;
    this.element.setAttribute('style', 'cursor:pointer');
  }
}
