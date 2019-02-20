import Page from './Page';
import DataInputStep from './DataInputStep';
import Animation from './Animation';
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
        this.renderResult = this.renderResult.bind(this);
    }

    show() {
        this.render();
        this.prevBtn = document.querySelector('.js-prevBtn');
        this.nextBtn = document.querySelector('.js-nextBtn');
        this._addControlHandlers();
        this.renderDataInput();
    }

    _addControlHandlers() {
        this.prevBtn.addEventListener('click', () => {
            let addedContent = document.querySelector('.addedContent');
            Animation.fadeOut(addedContent, () => {
                this.renderDataInput();
            });
        });

        this.nextBtn.addEventListener('click', () => {
            let addedContent = document.querySelector('.addedContent');
            Animation.fadeOut(addedContent, () => {
                switch (this.operFlag) {
                    case 'dataInput':
                        this.renderConfirmData();
                        break;

                    case 'confirmData':
                        this.renderCalculation();
                        break;
                }
            });
        });
    }

    nextState(flag, title) {
        this.operFlag = flag;
        this.renderTitle(title)
    }

    renderDataInput() {
        this.nextState('dataInput', 'Ввод данных');
        let dataInput = new DataInputStep(this);
        dataInput.show();
    }

    async renderConfirmData() {
        this.nextState('confirmData', 'Подтверждение данных');
        let ConfirmDataStep = await import('./ConfirmDataStep');
        let confirmData = new ConfirmDataStep.default(this);
        confirmData.show();
    }

    async renderCalculation() {
        this.nextState('calculation', 'Расчет');
        let CalculationStep = await import('./CalculationStep');
        let calculation = new CalculationStep.default(this);
        calculation.show();
        calculation.onNextPage(this.renderResult, 2000);
    }

    async renderResult() {
        this.nextState('result', 'Результат');
        let ResultStep = await import('./ResultStep');
        let result = new ResultStep.default(this);
        result.show();
    }
}
