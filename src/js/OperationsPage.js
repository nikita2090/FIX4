import Page from './Page';
import operationsTmp from '../hbs/operations.hbs';

export default class OperationsPage extends Page {
    constructor(email) {
        super({
            pageTitle: 'Ввод данных',
            template: operationsTmp,
            title: 'Сумматор',
            subtitle: 'Удобное сложение целых чисел'
        });

        this.operFlag = 'dataInput';
        this.numbers = [];
        this.sumResult = 0;
        this.email = email;

        this.render();
        this.prevBtn = document.querySelector('.js-prevBtn');
        this.nextBtn = document.querySelector('.js-nextBtn');
    }

    addControlHandlers(prevHandler, nextHandler) {
        this.prevBtn.addEventListener('click', prevHandler);
        this.nextBtn.addEventListener('click', nextHandler);
    }
}
