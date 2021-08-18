import './popup__gameover.scss';
import { HeaderItemStart } from '../header__item-start/header__item-start';
import { User } from '../../models/user';

export class PopupGameOver {
  gameoverButton: HTMLElement;

  scoreRouter: HTMLElement;

  readonly element: HTMLElement;

  rootElement = <HTMLElement>document.getElementById('app');

  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    time: number,
  ) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
    <div class="gameover__window">
      <span class="gameover__message">Congratulations! You successfully found all matches on ${(
    time / 60
  ).toFixed(2)} minutes.</span>
      <span class="gameover__button">Ok</span>
    </div>
    `;
    this.gameoverButton = <HTMLElement>(
      document.querySelector('.gameover__button')
    );
    this.scoreRouter = <HTMLElement>(
      document.querySelector('.header__item-score')
    );
    this.gameoverButton.onclick = (): void => {
      const disablerouters = document.getElementsByTagName('li');
      const array = [...disablerouters];
      array.forEach((element) => {
        element.classList.remove('disable');
        element.classList.remove('active');
      });
      const newStartButton = new HeaderItemStart().element;
      newStartButton.classList.remove('hide');
      const oldstartButton = <HTMLElement>document.getElementById('start');
      oldstartButton.parentElement?.replaceChild(
        newStartButton,
        oldstartButton,
      );
      this.scoreRouter.classList.add('active');
      window.location.href = '#/score';
      this.element.remove();
    };
  }

  saveUserData = (): void => {
    let user: User = {
      userFirstName: '',
      userLastName: '',
      userEmail: '',
      avatar: '',
      score: '',
    };
    const raw = localStorage.getItem('user');
    if (raw !== null) {
      user = JSON.parse(raw);
    }
    const score = localStorage.getItem('score');
    if (score) user.score = score;
    let db: IDBDatabase;
    const openRequest = indexedDB.open('halaveika', 1);
    openRequest.onerror = (event): void => {
      if (event.target) db = openRequest.result;
    };
    openRequest.onsuccess = (event) => {
      if (event.target) db = openRequest.result;
      this.addUser(db, user);
    };
    openRequest.onupgradeneeded = () => {
      db = openRequest.result;
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      }
    };
  };

  addUser = (db: IDBDatabase, user: User): void => {
    const transaction = db.transaction('users', 'readwrite');
    const store = transaction.objectStore('users');
    store.add(user);
  };
}
