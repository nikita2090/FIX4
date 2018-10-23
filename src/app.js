import './scss/styles.scss'
import './js/handlebars.runtime.js';
import MainPage from './js/MainPage';

let mainPage = new MainPage();
mainPage.show();
/*
function mainBtnHandler() {
    let loginPage = new LoginPage();
    loginPage.addSubmitListener();

    function submitHandler() {
        let operationsPage = new OperationsPage(loginPage.email);
        operationsPage.addControlHandlers(prevHandler, nextHandler);
        renderDataInput();

        function prevHandler() {
            let addedContent = document.querySelector('.addedContent');
            Animation.fadeOut(addedContent, () => {
                renderDataInput();
            });
        }

        function nextHandler() {
            let addedContent = document.querySelector('.addedContent');
            Animation.fadeOut(addedContent, () => {
                switch (operationsPage.operFlag) {
                    case 'dataInput':
                        renderConfirmData();
                        break;

                    case 'confirmData':
                        renderCalculation();
                        break;
                }
            });
        }

        function renderDataInput() {
            operationsPage.nextState('dataInput', 'Ввод данных');
            new DataInputStep(operationsPage);
        }

        function renderConfirmData() {
            operationsPage.nextState('confirmData', 'Подтверждение данных');
            new ConfirmDataStep(operationsPage);
        }

        function renderCalculation() {
            operationsPage.nextState('calculation', 'Расчет');
            let calculation = new CalculationStep(operationsPage);
            calculation.onNextPage(renderResult, 2000);
        }

        function renderResult() {
            operationsPage.nextState('result', 'Результат');
            new ResultStep(operationsPage);
        }
    }
}


*/






