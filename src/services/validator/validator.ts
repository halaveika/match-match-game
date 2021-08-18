import { BaseComponent } from '../../components/base-component';
import { toDefault } from '../../shared/toDefault';
import { removeClassNodes } from '../../shared/removeClassNodes';

export class Validator {
  private firstNameInput: HTMLInputElement;

  private lastNameInput: HTMLInputElement;

  private emailInput: HTMLInputElement;

  constructor() {
    this.firstNameInput = <HTMLInputElement>(
      document.getElementById('first-name')
    );
    this.lastNameInput = <HTMLInputElement>document.getElementById('last-name');
    this.emailInput = <HTMLInputElement>document.getElementById('email');
  }

  checkInputs = (): boolean => {
    removeClassNodes('error__mg');
    toDefault([this.firstNameInput, this.lastNameInput, this.emailInput]);
    const firstname = this.firstNameInput.value.trim();
    const lastname = this.lastNameInput.value.trim();
    const email = this.emailInput.value.trim();
    const reName1 = new RegExp(/^[0-9]+$/i);
    const reName2 = new RegExp(/^[^(~!@#$%*()_—+=|:;"'`<>,.?/^)]/i);
    const FirstPartOfRegExp = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))/;
    const SecondPartOfRegExp = /@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const reEmail = new RegExp(
      `${FirstPartOfRegExp.source}${SecondPartOfRegExp.source}`,
    );
    let firstnameErrorMessage = '';
    let lastnameErrorMessage = '';
    let emailErrorMessage = '';
    if (firstname === '') firstnameErrorMessage += '-Firstname input can not be emty\n';
    if (reName1.test(firstname)) firstnameErrorMessage += '-Firstname can not include only digits\n';
    if (!reName2.test(firstname)) {
      firstnameErrorMessage
        += '-Firstname should not include ~ ! @ # $ % * () _ — + = | : ; " \'  < > , . ? / ^;  /\n';
    }
    if (firstname.length > 30) {
      firstnameErrorMessage
        += '-Firstname input should be less the 30 symbols\n';
    }
    if (lastname === '') lastnameErrorMessage += '-Lastname input can not be emty\n';
    if (reName1.test(lastname)) lastnameErrorMessage += '-Lastname can not include only digits\n';
    if (!reName2.test(lastname)) {
      lastnameErrorMessage
        += '-Lastname should not include ~ ! @ # $ % * _ — + = | : ; " \'  < > , . ? / ^;  /\n';
    }
    if (lastname.length > 30) lastnameErrorMessage += '-Lastname input should be less the 30 symbols\n';
    if (email === '') emailErrorMessage += '-Email input can not be emty\n';
    if (!reEmail.test(email)) emailErrorMessage += '-Email should be as RFC standart\n';
    if (email.length > 30) emailErrorMessage += '-Email should be less the 30 symbols\n';

    if (firstnameErrorMessage.length > 0) this.firstNameInput.classList.add('error');
    else this.firstNameInput.classList.add('sucsess');
    if (lastnameErrorMessage.length > 0) this.lastNameInput.classList.add('error');
    else this.lastNameInput.classList.add('sucsess');
    if (emailErrorMessage.length > 0) this.emailInput.classList.add('error');
    else this.emailInput.classList.add('sucsess');
    if (
      this.firstNameInput.classList.contains('error')
      || this.lastNameInput.classList.contains('error')
      || this.emailInput.classList.contains('error')
    ) {
      if (firstnameErrorMessage.length > 0) {
        const errorForm = new BaseComponent('span', ['error__mg']);
        errorForm.element.innerText = `Errors in Firstname:\n${firstnameErrorMessage}`;
        this.firstNameInput.parentNode?.appendChild(errorForm.element);
      }
      if (lastnameErrorMessage.length > 0) {
        const errorForm = new BaseComponent('span', ['error__mg']);
        errorForm.element.innerText = `Errors in Lastname:\n${lastnameErrorMessage}`;
        this.firstNameInput.parentNode?.appendChild(errorForm.element);
      }
      if (emailErrorMessage.length > 0) {
        const errorForm = new BaseComponent('span', ['error__mg']);
        errorForm.element.innerText = `Errors in Email:\n${emailErrorMessage}`;
        this.firstNameInput.parentNode?.appendChild(errorForm.element);
      }
      return false;
    }
    return true;
  };
}
