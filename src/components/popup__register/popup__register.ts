import './popup__register.scss';
import { toDefault } from '../../shared/toDefault';
import { removeClassNodes } from '../../shared/removeClassNodes';
import { BaseComponent } from '../base-component';
import { AvatarContainer } from '../popup__register-avatar-container/popup__register-avatar-container';
import { AddButton } from './addButton/add__button';
import { FirstNameInput } from './firstNameInput/firstNameInput';
import { FirstNameLabel } from './firstNameLabel/firstNameLabel';
import { LastNameInput } from './lastNameInput/lastNameInput';
import { LastNameLabel } from './lastNameLabel/lastNameLabel';
import { EmailInput } from './emailInput/emailInput';
import { EmailLabel } from './emailLabel/emailLabel';
import { CancelButton } from './cancelButton/cancelButton';

export class PopupRegister extends BaseComponent {
  private firstNameInput: FirstNameInput;

  private lastNameInput: LastNameInput;

  private emailInput: EmailInput;

  private avatarInput: AvatarContainer;

  private addButton: AddButton;

  cancelButton: BaseComponent;

  constructor() {
    super('form', ['popup__register', 'show']);
    const containerLeft = this.render('div', ['popup__container-left']);
    const containerRight = this.render('div', ['popup__container-right']);
    containerLeft.render('h2', ['title']).element.innerHTML = 'Register new Player';
    this.firstNameInput = new FirstNameInput();
    containerLeft.element.appendChild(this.firstNameInput.element);
    const firstNameLabel = new FirstNameLabel();
    containerLeft.element.appendChild(firstNameLabel.element);
    this.lastNameInput = new LastNameInput();
    containerLeft.element.appendChild(this.lastNameInput.element);
    const lastNameLabel = new LastNameLabel();
    containerLeft.element.appendChild(lastNameLabel.element);
    this.emailInput = new EmailInput();
    containerLeft.element.appendChild(this.emailInput.element);
    const emailLabel = new EmailLabel();
    containerLeft.element.appendChild(emailLabel.element);
    this.avatarInput = new AvatarContainer();
    containerRight.element.appendChild(this.avatarInput.element);
    this.addButton = new AddButton();
    containerRight.element.appendChild(this.addButton.element);
    this.cancelButton = new CancelButton();
    containerRight.element.appendChild(this.cancelButton.element);
  }

  cleanForm(): void {
    removeClassNodes('error__mg');
    this.firstNameInput.element.value = '';
    this.lastNameInput.element.value = '';
    this.emailInput.element.value = '';
    toDefault([
      this.firstNameInput.element,
      this.lastNameInput.element,
      this.emailInput.element,
    ]);
    this.avatarInput.element.style.backgroundImage = this.avatarInput.defaultImage;
  }

  closeForm(element: HTMLElement): void {
    element.remove();
    this.element.remove();
  }

  getUserInfo() :string|null {
    const avatar = localStorage.getItem('avatar');
    const user = {
      userFirstName: this.firstNameInput.element.value,
      userLastName: this.lastNameInput.element.value,
      userEmail: this.emailInput.element.value,
      avatar,
    };
    localStorage.setItem('user', JSON.stringify(user));
    return user.avatar;
  }
}
