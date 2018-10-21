import './scss/styles.scss'
import './js/handlebars.runtime.js';
import MainPage from './js/MainPage';
import LoginPage from './js/LoginPage';
import OperationsPage from './js/OperationsPage';
import DataInputStep from './js/DataInputStep';
import ConfirmDataStep from './js/ConfirmDataStep';
import CalculationStep from "./js/CalculationStep";
import ResultStep from "./js/ResultStep";
import Animation from './js/Animation';

let mainPage = new MainPage();
mainPage.addBtnListener(mainBtnHandler);

function mainBtnHandler() {
    let loginPage = new LoginPage();
    loginPage.addSubmitListener(submitHandler);

    function submitHandler() {
        let operationsPage = new OperationsPage(loginPage.email);
        operationsPage.addControlHandlers(prevHandler, nextHandler);
        renderDataInput();

        function prevHandler() {
            let addedContent = document.querySelector('.addedContent');
            Animation.fadeOut(addedContent, function () {
                renderDataInput();
            });
        }

        function nextHandler() {
            let addedContent = document.querySelector('.addedContent');
            Animation.fadeOut(addedContent, function () {
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
            operationsPage.renderTitle('Ввод данных');
            operationsPage.operFlag = 'dataInput';
            new DataInputStep(operationsPage);
        }

        function renderConfirmData() {
            operationsPage.operFlag = 'confirmData';
            operationsPage.renderTitle('Подтверждение данных');
            new ConfirmDataStep(operationsPage);
        }

        function renderCalculation() {
            operationsPage.renderTitle('Расчет');
            let calculation = new CalculationStep(operationsPage);
            calculation.onNextPage(renderResult, 2000);
        }

        function renderResult() {
            operationsPage.operFlag = 'result';
            operationsPage.renderTitle('Результат');
            new ResultStep(operationsPage);
        }
    }
}









