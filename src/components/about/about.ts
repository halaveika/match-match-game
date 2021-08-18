import './about.scss';
import { BaseComponent } from '../base-component';

export class About extends BaseComponent {
  constructor() {
    super('div', ['about']);
    this.element.innerHTML = `
    <div class="about__container-info">
      <h2 class="about__title">How to play</h2>
      <div id="rule1">
        <h3>Register new player in game</h3>
      </div>
      <div id="rule2">
        <h3>Configure your game settings</h3>
      </div>
      <div id="rule3">
        <h3>Start you new game! Remember card positions and match it before times up.</h3>
      </div>
      <div class="card__back"></div>
    </div>
  `;
    const aboutContainerForm = new BaseComponent('div', [
      'about__container-forms',
    ]);
    this.element.appendChild(aboutContainerForm.element);
    aboutContainerForm.render('div', ['register-pic']);
    aboutContainerForm.render('div', ['gameSettings-pic']);
    aboutContainerForm.render('div', ['card-field-pic']);
  }
}
