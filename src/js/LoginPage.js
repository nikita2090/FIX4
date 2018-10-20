import Page from './Page';
import Button from './Button';

export default class LoginPage extends Page{
    constructor(options){
        super(options);
        this.login = null;
        this.password = null;
        this.submit = null;
        this.email = null;

        this._formHandler = this._formHandler.bind(this);
    }

    addInputListeners(){
        this._addLoginListener(this._formHandler);
        this._addPasswordListener(this._formHandler);
    }

    addSubmitListener(handler){
        this.submit = document.querySelector('.logInForm__submit');
        this.submit.addEventListener('click', handler)
    }

    _addLoginListener(handler){
        this.login = document.querySelector('#name');
        this.login.addEventListener('input', handler);
    }

    _addPasswordListener(handler){
        this.password = document.querySelector('#password');
        this.password.addEventListener('input', handler);
    }

    _formHandler() {
        if (this._checkForm()) {
            Button.enable([this.submit]);
            console.log(this.email);
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