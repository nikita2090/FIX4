import Page from './Page';
import operationsTmp from '../hbs/operations.hbs';

export default class OperationsPage extends Page {
    constructor(options) {
        super({
            pageTitle: 'Ввод данных',
            template: operationsTmp,
            title: 'Сумматор',
            subtitle: 'Удобное сложение целых чисел'
        });

        this.operFlag = 'dataInput';
        this.numbers = [];
        this.sumResult = 0;

        this.render();
    }

    addControlHandlers(prevHandler, nextHandler) {
        this.addPrevBtnHandler(prevHandler);
        this.addNextBtnHandler(nextHandler);
    }

    addPrevBtnHandler(handler) {
        this.prevBtn = document.querySelector('.js-prevBtn');
        this.prevBtn.addEventListener('click', handler);
    }

    addNextBtnHandler(handler) {
        this.nextBtn = document.querySelector('.js-nextBtn');
        this.nextBtn.addEventListener('click', handler);
    }
}
