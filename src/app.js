import './scss/styles.scss'
import './js/handlebars.runtime.js';

import tmp from './js/templates';
import Step from './js/Step';
import Button from './js/Button';
import Animation from './js/Animation';
import Table from './js/Table';

import MainPage from './js/MainPage';
import LoginPage from './js/LoginPage';
import OperationsPage from './js/OperationsPage';
import DataInputStep from './js/DataInputStep';
import ConfirmDataStep from './js/ConfirmDataStep';


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
            new DataInputStep(operationsPage);
        }

        function renderConfirmData() {
            operationsPage.operFlag = 'confirmData';
            operationsPage.renderTitle('Подтверждение данных');
            new ConfirmDataStep(operationsPage);
        }

        function renderCalculation() {
            //operFlag = 'calculation';
            operationsPage.renderTitle('Расчет');
            let calculation = new Step({
                //email: loginPage.email,
                stepFlag: 'calculation',
                leftSideTemplate: tmp.operLeftSide,
                rightSideTemplate: tmp.calculate,
                hideBtnsArr: [operationsPage.prevBtn, operationsPage.nextBtn]
            }).render();

            setTimeout(function () {
                renderResult();
            }, 2000);

            operationsPage.sumResult = 0;
            operationsPage.sumResult = calculate(numbers);

            function calculate(numbersArr) {
                let result = 0;
                for (let number of numbersArr) {
                    number = Number(number);
                    result += number;
                }
                return result;
            }
        }

        function renderResult() {
            //operFlag = 'result';
            operationsPage.renderTitle('Результат');
            let result = new Step({
                //email: loginPage.email,
                stepFlag: 'result',
                leftSideTemplate: tmp.operLeftSide,
                rightSideTemplate: tmp.result,
                result: sumResult,
                renameBtnElem: operationsPage.prevBtn,
                renameBtnName: 'Вернутся к вводу данных',
                resizeBtnElem: operationsPage.prevBtn,
                resizeBtnSize: 'big',
                showBtnsArr: [operationsPage.prevBtn],
            }).render();

            let resultTable = document.querySelector('.js-result');
            let firstTableRow = resultTable.firstElementChild;

            Table.create(firstTableRow, numbers, 'afterEnd');
            paintRows(resultTable);

            function paintRows(parent) {
                let rows = parent.rows;
                for (let i = 0; i < rows.length; i++) {
                    if (rows[i].classList.contains('result')) return;

                    let cells = rows[i].cells;
                    for (let j = 0; j < cells.length; j++) {
                        if (!j % 2) continue;
                        let numCell = Number(cells[j].innerHTML);
                        if (numCell > 10) {
                            cells[j].parentNode.classList.add('painted');
                        }
                    }
                }
            }
        }
    }
}









