import './game.scss';
import { delay } from '../../shared/delay';
import { BaseComponent } from '../base-component';
import { GameTimer } from '../game-timer/game-timer';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { ScoreCounter } from '../../services/scoreCounter/scoreCounter';
import { PopupGameOver } from '../popup__gameover/popup__gameover';

const FLIP_DELAY = 1000;

export class Game extends BaseComponent {
  public popupGameover?: PopupGameOver;

  public scoreCounter: ScoreCounter;

  private gameTimer: GameTimer;

  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  private switchGameButton = <HTMLElement>(
    document.getElementsByClassName('header__item-start')[0]
  );

  constructor() {
    super('div', ['game']);
    this.gameTimer = new GameTimer();
    this.element.appendChild(this.gameTimer.element);
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
    this.switchGameButton.onclick = () => {
      this.gameTimer.startStop();
    };
    this.scoreCounter = new ScoreCounter();
  }

  newGame(images: string[]): void {
    this.scoreCounter.gameDifficult = images.length;
    this.switchGameButton.classList.add('disable');
    setTimeout(() => {
      this.switchGameButton.classList.remove('disable');
      this.gameTimer.startStop();
    }, 30000);
    this.cardsField.clear();
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);
    cards.forEach((card) => {
      const startStopListener = () => this.cardHandler(card);
      card.element.addEventListener('click', startStopListener);
    });
    this.cardsField.addCards(cards);
  }

  gameover = (): void => {
    this.gameTimer.startStop();
    this.scoreCounter.time = Number(this.gameTimer.displayMinutes) * 60
      + Number(this.gameTimer.displaySeconds);
    localStorage.setItem('score', this.scoreCounter.count().toString());
    this.popupGameover = new PopupGameOver(
      'div',
      ['gameover'],
      this.scoreCounter.time,
    );
    this.popupGameover.saveUserData();
  };

  private async cardHandler(card: Card) {
    card.resetCard();
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    await card.flipToFront();
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      card.badTurn();
      this.activeCard?.badTurn();
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      this.scoreCounter.badTurns++;
    } else {
      card.goodTurn();
      this.activeCard?.goodTurn();
    }
    this.activeCard = undefined;
    this.isAnimation = false;
    this.scoreCounter.turns++;
    if (
      this.scoreCounter.turns - this.scoreCounter.badTurns
      === this.scoreCounter.gameDifficult
    ) this.gameover();
  }
}
