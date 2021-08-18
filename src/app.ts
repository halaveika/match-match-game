import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { Router } from './services/router/router';
import { PopupRegister } from './components/popup__register/popup__register';
import { BaseComponent } from './components/base-component';
import { Validator } from './services/validator/validator';

export class App {
  private cardsType = 0;

  private gameDifficulty = 16;

  private readonly header: Header;

  private main: Main;

  private readonly router: Router;

  private popupRegister?: PopupRegister;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.main = new Main('about');
    this.rootElement.appendChild(this.main.element);
    this.router = new Router();
    this.router
      .add('about', () => {
        this.rootElement.removeChild(this.main.element);
        this.main = new Main('about');
        this.rootElement.appendChild(this.main.element);
      })
      .add('start', () => {
        this.rootElement.removeChild(this.main.element);
        this.main = new Main('game');
        this.rootElement.appendChild(this.main.element);
        this.main.start(this.cardsType, this.gameDifficulty);
      })
      .add('settings', () => {
        this.rootElement.removeChild(this.main.element);
        this.main = new Main('settings');
        this.rootElement.appendChild(this.main.element);
        const cardsTypeSelected: HTMLSelectElement = <HTMLSelectElement>(
          document.getElementById('cardsType')
        );
        const gameDifficultySelected: HTMLSelectElement = <HTMLSelectElement>(
          document.getElementById('gameDifficulty')
        );
        cardsTypeSelected.onchange = () => {
          if (Number(cardsTypeSelected.value) !== this.cardsType) {
            this.cardsType = Number(cardsTypeSelected.value);
          }
        };
        gameDifficultySelected.onchange = () => {
          if (Number(gameDifficultySelected.value) !== this.gameDifficulty) {
            this.gameDifficulty = Number(gameDifficultySelected.value);
          }
        };
      })
      .add('score', () => {
        this.rootElement.removeChild(this.main.element);
        this.main = new Main('score');
        this.rootElement.appendChild(this.main.element);
      });

    window.addEventListener('hashchange', () => {
      this.router.listen();
    });
    const registrButton = <HTMLElement>(
      document.querySelector('.header__item-register')
    );
    registrButton.onclick = () => {
      const popupOverlay = new BaseComponent('div', ['popupOverlay']);
      this.rootElement.appendChild(popupOverlay.element);
      this.popupRegister = new PopupRegister();
      this.main.element.appendChild(this.popupRegister.element);
      const validator = new Validator();
      this.popupRegister.element.onsubmit = (event) => {
        event.preventDefault();
        if (validator.checkInputs() && this.popupRegister) {
          this.header.headerStartGamePosition(this.popupRegister.getUserInfo());
          this.popupRegister.closeForm(popupOverlay.element);
        }
      };
      popupOverlay.element.onclick = () => {
        if (this.popupRegister) this.popupRegister.closeForm(popupOverlay.element);
      };
      this.popupRegister.cancelButton.element.onclick = () => {
        if (this.popupRegister) this.popupRegister.cleanForm();
      };
    };
  }
}
