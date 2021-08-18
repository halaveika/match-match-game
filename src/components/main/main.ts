import './main.scss';
import { BaseComponent } from '../base-component';
import { About } from '../about/about';
import { Game } from '../game/game';
import { ImageCategoryModel } from '../../models/image-category-model';
import { Settings } from '../settings/settings';
import { Score } from '../score/score';

export class Main extends BaseComponent {
  private about?: About;

  private game?: Game;

  private settings?: Settings;

  private score?: Score;

  private aboutButton = <HTMLElement>(
    document.querySelector('.header__item-about')
  );

  private settingsButton = <HTMLElement>(
    document.querySelector('.header__item-settings')
  );

  private scoreButton = <HTMLElement>(
    document.querySelector('.header__item-score')
  );

  constructor(page: string) {
    super('main', ['main']);
    if (page === 'about') {
      this.about = new About();
      this.element.appendChild(this.about.element);
    }
    if (page === 'game') {
      this.game = new Game();
      this.element.appendChild(this.game.element);
    }
    if (page === 'settings') {
      this.settings = new Settings();
      this.element.appendChild(this.settings.element);
    }

    if (page === 'score') {
      this.score = new Score();
      this.element.appendChild(this.score.element);
    }
  }

  async start(cardsType: number, gameDifficulty: number): Promise<void> {
    this.aboutButton.classList.add('disable');
    this.settingsButton.classList.add('disable');
    this.scoreButton.classList.add('disable');
    const res = await fetch('./image.json');
    const categories: ImageCategoryModel[] = await res.json();
    // To impliment differet categories to start the game
    if (gameDifficulty === 16) {
      document.documentElement.style.setProperty('--cardWidth', '100px');
      document.documentElement.style.setProperty('--cardHeight', '100px');
      document.documentElement.style.setProperty('--gameFieldWidth', '445px');
    } else {
      document.documentElement.style.setProperty('--cardWidth', '100px');
      document.documentElement.style.setProperty('--cardHeight', '100px');
      document.documentElement.style.setProperty('--gameFieldWidth', '1200px');
    }
    const cat = categories[cardsType];
    const images = cat.images
      .slice(0, gameDifficulty / 2)
      .map((name) => `${cat.category}/${name}`);
    if (this.game) this.game.newGame(images);
  }
}
