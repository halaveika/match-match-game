import './header.scss';
import { BaseComponent } from '../base-component';
import { HeaderNav } from '../header-nav/header-nav';

export class Header extends BaseComponent {
  private headerNav: HeaderNav;

  constructor() {
    super('header', ['header']);
    this.headerNav = new HeaderNav();
    this.element.appendChild(this.headerNav.element);
  }

  headerStartGamePosition(img: string | null): void {
    this.headerNav.register.element.classList.add('hide');
    this.headerNav.start.element.classList.remove('hide');
    this.headerNav.avatar.element.classList.remove('hide');
    if (img) this.headerNav.avatar.element.style.backgroundImage = `url(${img})`;
  }
}
