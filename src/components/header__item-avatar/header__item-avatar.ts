import './header__item-avatar.scss';
import { BaseComponent } from '../base-component';

export class HeaderItemAvatar extends BaseComponent {
  constructor() {
    super('li', ['header__item-avatar', 'hide']);
  }
}
