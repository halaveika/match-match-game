import './game-timer.scss';
import { BaseComponent } from '../base-component';

export class GameTimer extends BaseComponent {
  // Define vars to hold time values
  seconds = 0;

  minutes = 0;

  // Define vars to hold "display" value
  displaySeconds = '0';

  displayMinutes = '0';

  otputTime = '00:00';

  // Define var to hold setInterval() function
  private interval = 0;

  // Define var to hold stopwatch status
  private status = 'stopped';

  switchGameButton: HTMLElement = <HTMLElement>document.getElementById('start');

  outputElement: BaseComponent;

  constructor() {
    super('div', ['game-timer']);
    this.outputElement = new BaseComponent('span', ['game-timer__output']);
    this.element.appendChild(this.outputElement.element);
    this.outputElement.element.innerHTML = this.otputTime;
  }

  // Stopwatch function (logic to determine when to increment next value, etc.)
  stopWatch = (): void => {
    this.seconds++;
    // Logic to determine when to increment next value
    if (this.seconds / 60 === 1) {
      this.seconds = 0;
      this.minutes++;
    }
    // If seconds/minutes are only one digit, add a leading 0 to the value
    if (this.seconds < 10) {
      this.displaySeconds = `0${this.seconds.toString()}`;
    } else {
      this.displaySeconds = this.seconds.toString();
    }

    if (this.minutes < 10) {
      this.displayMinutes = `0${this.minutes.toString()}`;
    } else {
      this.displayMinutes = this.minutes.toString();
    }
    // Display updated time values to user
    this.otputTime = `${this.displayMinutes}:${this.displaySeconds}`;
    this.outputElement.element.innerHTML = this.otputTime;
  };

  startStop = (): void => {
    if (this.status === 'stopped') {
      this.stopStartCardPick();
      // Start the stopwatch (by calling the setInterval() function)
      this.interval = window.setInterval(this.stopWatch.bind(this), 1000);
      this.switchGameButton.textContent = 'stop game';
      this.status = 'started';
    } else {
      this.stopStartCardPick();
      window.clearInterval(this.interval);
      this.switchGameButton.textContent = 'start game';
      this.status = 'stopped';
    }
  };

  stopStartCardPick = (): void => {
    const cards = document.querySelectorAll('.card-container');

    if (this.status === 'stopped') cards.forEach((element) => element.classList.remove('disable'));
    else cards.forEach((element) => element.classList.add('disable'));
  };
}
