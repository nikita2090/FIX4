import Page from './Page';
import DataInputStep from './DataInputStep';
import ConfirmDataStep from './ConfirmDataStep';
import CalculationStep from './CalculationStep';
import ResultStep from './ResultStep';
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
        this.addControlHandlers();
        this.renderDataInput();
    }

    addControlHandlers() {
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

    renderConfirmData() {
        this.nextState('confirmData', 'Подтверждение данных');
        let confirmData = new ConfirmDataStep(this);
        confirmData.show();
    }

    renderCalculation() {
        this.nextState('calculation', 'Расчет');
        let calculation = new CalculationStep(this);
        calculation.show();
        calculation.onNextPage(this.renderResult, 2000);
    }

    renderResult() {
        console.log(this);
        this.nextState('result', 'Результат');
        let result = new ResultStep(this);
        result.show();
    }
}
