import Page from './Page';
import LoginPage from './LoginPage';
import mainTmp from '../hbs/main.hbs';

export default class MainPage extends Page {
    constructor() {
        super({
            pageTitle: 'Сумматор',
            template: mainTmp,
            title: 'Сумматор',
            subtitle: 'Удобное сложение целых чисел',
            description: 'Сумматор помогает складывать любое количество целых чисел одновременно' +
            ' и сортировать их перед сложением. Попробуйте прямо сейчас!',
            btnName: 'Хочу суммировать',
        });
    }

    show() {
        this.render();
        this.mainBtn = document.querySelector('.js-mainContent__btn');
        this._addBtnListener();
    }

    _addBtnListener() {
        this.mainBtn.addEventListener('click', () => {
            let loginPage = new LoginPage();
            loginPage.show();
        });
    }
}