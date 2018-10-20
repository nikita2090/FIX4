import './scss/styles.scss'
import './js/handlebars.runtime.js';

import tmp from './js/templates';
//import Page from './js/Page';
import Step from './js/Step';
import Button from './js/Button';
import Animation from './js/Animation';
import Table from './js/Table';

import MainPage from './js/MainPage';
import LoginPage from './js/LoginPage';
import OperationsPage from './js/OperationsPage';
import DataInputStep from './js/DataInputStep';


let mainPage = new MainPage({
    pageTitle: 'Сумматор',
    template: tmp.main,
    title: 'Сумматор',
    subtitle: 'Удобное сложение целых чисел',
    description: 'Сумматор помогает складывать любое количество целых чисел одновременно' +
    ' и сортировать их перед сложением. Попробуйте прямо сейчас!',
    btnName: 'Хочу суммировать',
});
mainPage.render();

mainPage.addBtnListener(mainBtnHandler);

function mainBtnHandler() {
    let loginPage = new LoginPage({
        pageTitle: 'Сумматор|Вход',
        template: tmp.logIn,
        title: 'Сумматор',
        subtitle: 'Вход',
        btnName: 'Войти',
    });
    loginPage.render();
    loginPage.addInputListeners();
    loginPage.addSubmitListener(submitHandler);
}

function submitHandler() {
    let operationsPage = new OperationsPage({
        pageTitle: 'Ввод данных',
        template: tmp.operations,
        title: 'Сумматор',
        subtitle: 'Удобное сложение целых чисел'
    });
    operationsPage.render();

    //let operRightContent = document.querySelector('.js-operRightContent');

    operationsPage.addPrevBtnHandler(prevHandler);
    operationsPage.addNextBtnHandler(nextHandler);

    //renderDataInput();

    operationsPage.renderTitle('Ввод данных');
    let dataInput = new DataInputStep({
        //email: loginPage.email,
        stepFlag: 'dataInput',
        leftSideTemplate: tmp.operLeftSide,
        rightSideTemplate: tmp.dataInput,
        renameBtnElem: operationsPage.prevBtn,
        renameBtnName: 'Назад',
        resizeBtnElem: operationsPage.prevBtn,
        resizeBtnSize: 'small',
        showBtnsArr: [operationsPage.nextBtn],
        disableBtnsArr: [operationsPage.prevBtn, operationsPage.nextBtn]
    });
    dataInput.render();

    dataInput.addPlusBtnListener();

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
        //operFlag = 'dataInput';


        /*let addBtn = document.querySelector('.js-add');
        addBtn.addEventListener('click', addBtnHandler);*/

        /*let inputs = document.getElementsByClassName('js-numInput');
        operRightContent.addEventListener('input', inputsHandler);
        inputs[0].focus();

        /*function addBtnHandler() {
            createInputRow(addBtn);

            function createInputRow(el) {
                let div = document.createElement('div');
                createInput(div);
                createWarning(div);
                el.before(div);

                function createInput(elem) {
                    let input = document.createElement('input');
                    input.classList.add('operRightContent__input', 'js-numInput');
                    elem.append(input);
                }

                function createWarning(elem) {
                    let div = document.createElement('div');
                    div.classList.add('operRightContent__warning');
                    elem.append(div);
                }
            }
        }*/

        /*function inputsHandler(e) {
            let target = e.target;
            if (target.classList.contains('js-numInput')) {
                Button.disable([operationsPage.nextBtn]);

                if (isCorrectInputs()) {
                    saveNumbers();
                } else {
                    return;
                }

                if (isTwoOrMoreNum()) {
                    Button.enable([operationsPage.nextBtn]);
                }
            }
        }

        function isCorrectInputs() {
            let isCorrect = true;
            for (let input of inputs) {
                let warning = input.nextSibling;
                if (isNaN(input.value) || input.value < 0 || isNotFloat(input.value)) {
                    warning.innerHTML = 'Введите целое положительное число';
                    isCorrect = false;
                } else {
                    warning.innerHTML = '';
                }
            }
            return isCorrect;

            function isNotFloat(num) {
                return Math.ceil(num) - num > 0
            }
        }

        function isTwoOrMoreNum() {
            return !(operationsPage.numbers.length < 2);
        }

        function saveNumbers() {
            operationsPage.numbers = [];
            let inputs = document.querySelectorAll('.js-numInput');
            for (let input of inputs) {
                if (input.value !== '') {
                    let value = Number(input.value).toFixed();
                    numbers.push(value);
                }
            }
        }*/
    }

    /*function renderConfirmData() {
        //operFlag = 'confirmData';
        operationsPage.renderTitle('Подтверждение данных');
        let confirmData = new Step({
            //email: loginPage.email,
            stepFlag: 'confirmData',
            leftSideTemplate: tmp.operLeftSide,
            rightSideTemplate: tmp.confirmData,
            enableBtnsArr: [operationsPage.prevBtn]
        }).render();

        let confirmTable = document.querySelector('.js-confirmTable');
        Table.create(confirmTable, numbers, 'beforeEnd');

        let sortedNumbers = numbers.slice();
        let sortBtn = document.querySelector('.sortBtn');
        sortBtn.addEventListener('click', sortBtnHandler);

        let filterInput = document.querySelector('.js-filter');
        filterInput.addEventListener('input', filterInputHandler);

        function sortBtnHandler() {
            if (sortBtn.classList.contains('ByDescending')) {
                Button.rename(sortBtn, 'Данные &#8593;');
                sortedNumbers.sort(sortByDescending);
                sortBtn.classList.remove('ByDescending');
            } else {
                Button.rename(sortBtn, 'Данные &#8595;');
                sortedNumbers.sort(sortByAscending);
                sortBtn.classList.add('ByDescending');
            }
            Table.clean(confirmTable);
            Table.create(confirmTable, sortedNumbers, 'beforeEnd');

            function sortByAscending(a, b) {
                return a - b;
            }

            function sortByDescending(a, b) {
                return b - a;
            }
        }

        function filterInputHandler() {
            if (isNaN(filterInput.value)) return;
            Table.clean(confirmTable);
            if (filterInput.value === '') {
                Table.create(confirmTable, sortedNumbers, 'beforeEnd');
            } else {
                let filteredNumbers = findNumber(filterInput.value, numbers);
                if (filteredNumbers.length === 0) {
                    filteredNumbers.push('Ничего не найдено');
                }
                Table.create(confirmTable, filteredNumbers, 'beforeEnd');
            }
        }

        function findNumber(number, arr) {
            let result = [];
            for (let n of arr) {
                if (n === number) {
                    result.push(n);
                }
            }
            return result;
        }
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
    }*/
}







