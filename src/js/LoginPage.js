import Page from './Page';
import Button from './Button';
import logInTmp from '../hbs/logIn.hbs';

export default class LoginPage extends Page {
    constructor() {
        super({
            pageTitle: 'Сумматор|Вход',
            template: logInTmp,
            title: 'Сумматор',
            subtitle: 'Вход',
            btnName: 'Войти',
        });

        this.email = null;
        this._formHandler = this._formHandler.bind(this);

        this.render();
        this.login = document.querySelector('#name');
        this.password = document.querySelector('#password');
        this.submit = document.querySelector('.logInForm__submit');
        this.addInputListeners();
    }

    addInputListeners() {
        this.login.addEventListener('input', this._formHandler);
        this.password.addEventListener('input', this._formHandler);
    }

    addSubmitListener(handler) {
        this.submit.addEventListener('click', handler)
    }

    _formHandler() {
        if (this._checkForm()) {
            Button.enable([this.submit]);
        } else {
            Button.disable([this.submit]);
        }
    }

    _checkForm() {
        let regEmail = /^(\w)(\w+)(@\w)(\w+)(\.\w{2,})$/;
        let regPassword = /^[\w\#\!\%\$\^\&\*]{6,}$/;

        if (this.login.value.search(regEmail) === 0 &&
            this.password.value.search(regPassword) === 0) {
            this.email = this.login.value.replace(regEmail, this._transformEmail);
            return true;
        } else return false;
    }

    _transformEmail(_, nameFirstChar, nameRestChars,
                    atWithFirstChar, restDomainChars,
                    endOfEmail) {
        nameFirstChar = nameFirstChar.toUpperCase();
        restDomainChars = restDomainChars.replace(/\w/g, '*');
        return nameFirstChar + nameRestChars + atWithFirstChar + restDomainChars + endOfEmail;
    }


}