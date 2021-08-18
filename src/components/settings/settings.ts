import './settings.scss';
import { BaseComponent } from '../base-component';

export class Settings extends BaseComponent {
  constructor() {
    super('div', ['settings']);
    this.element.innerHTML = `
      <h2>Game cards</h2>
      <div class="select">
        <select name="cardsType" id="cardsType">
          <option selected disabled>select game cards type</option>
          <option value="0">Animals</option>
          <option value="1">Sport</option>
          <option value="2">History</option>
        </select>
       </div>
      <h2>Difficulty</h2>
      <div class="select">
        <select name="gameDifficulty" id="gameDifficulty">
          <option selected disabled>select game type</option>
          <option value="16">4 x 4</option>
          <option value="36">6 x 6</option>
        </select>
       </div>
    `;
  }
}
