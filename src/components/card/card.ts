import './card.scss';
import { BaseComponent } from '../base-component';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlipped = false;

  constructor(readonly image: string) {
    super('div', ['card-container']);
    this.element.innerHTML = `
      <div class="card")>
        <div class="card__front" style="background-image: url('./images/${image}')"></div>
        <div class="card__back"></div>
      </div>
    `;
  }

  badTurn(): void {
    const img = <HTMLElement> this.element.children[0].children[0];
    img.classList.add('bad__turn');
  }

  goodTurn(): void {
    const img = <HTMLElement> this.element.children[0].children[0];
    img.classList.add('good__turn');
  }

  resetCard(): void {
    const img = <HTMLElement> this.element.children[0].children[0];
    if (img.classList.contains('bad__turn')) img.classList.remove('bad__turn');
  }

  flipToBack(): Promise<void> {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    this.isFlipped = false;
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resorve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resorve(), {
        once: true,
      });
    });
  }
}
