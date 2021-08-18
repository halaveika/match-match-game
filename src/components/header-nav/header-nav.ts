import './header-nav.scss';
import { BaseComponent } from '../base-component';
import { HeaderItemLogo } from '../header__item-logo/header__item-logo';
import { HeaderItemAbout } from '../header__item-about/header__item-about';
import { HeaderItemScore } from '../header__item-score/header__item-score';
import { HeaderItemSettings } from '../header__item-settings/header__item-settings';
import { HeaderItemRegister } from '../header__item-register/header__item-register';
import { HeaderItemStart } from '../header__item-start/header__item-start';
import { HeaderItemAvatar } from '../header__item-avatar/header__item-avatar';

export class HeaderNav extends BaseComponent {
  logo: HeaderItemLogo;

  about: HeaderItemAbout;

  score: HeaderItemScore;

  settings: HeaderItemSettings;

  register: HeaderItemRegister;

  start: HeaderItemStart;

  avatar: HeaderItemAvatar;

  constructor() {
    super('ul', ['header__nav']);
    this.logo = new HeaderItemLogo();
    this.element.appendChild(this.logo.element);
    this.about = new HeaderItemAbout();
    this.element.appendChild(this.about.element);
    this.about.element.onclick = (event: Event): void => {
      this.highlightRout(event);
      window.location.href = '#/about';
    };
    this.score = new HeaderItemScore();
    this.element.appendChild(this.score.element);
    this.score.element.onclick = (event: Event): void => {
      this.highlightRout(event);
      window.location.href = '#/score';
    };
    this.settings = new HeaderItemSettings();
    this.element.appendChild(this.settings.element);
    this.settings.element.onclick = (event: Event): void => {
      this.highlightRout(event);
      window.location.href = '#/settings';
    };
    this.register = new HeaderItemRegister();
    this.element.appendChild(this.register.element);
    this.start = new HeaderItemStart();
    this.element.appendChild(this.start.element);
    this.avatar = new HeaderItemAvatar();
    this.element.appendChild(this.avatar.element);
  }

  highlightRout(event: Event): void {
    const currentItem = <HTMLElement>event.target;
    document.getElementsByClassName('active')[0].classList.remove('active');
    if (
      event.target === this.about.element
      || this.score.element
      || this.settings.element
    ) {
      currentItem.classList.add('active');
    }
  }
}
