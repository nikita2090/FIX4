import Step from "./Step";
import Button from './Button';
import operLeftSideTmp from '../hbs/operLeftSide.hbs';
import dataInputTmp from '../hbs/dataInput.hbs';

export default class DataInputStep extends Step {
    constructor(page) {
        super({
            email: page.email,
            stepFlag: 'dataInput',
            leftSideTemplate: operLeftSideTmp,
            rightSideTemplate: dataInputTmp,
            renameBtnElem: page.prevBtn,
            renameBtnName: 'Назад',
            resizeBtnElem: page.prevBtn,
            resizeBtnSize: 'small',
            showBtnsArr: [page.nextBtn],
            disableBtnsArr: [page.prevBtn, page.nextBtn],
        });
        this.page = page;

        this.render();
        this.operRightContent = document.querySelector('.js-operRightContent');
        this.inputs = document.getElementsByClassName('js-numInput');
        this.addPlusBtnListener();
        this.addInputsHandler();
    }

    addPlusBtnListener() {
        this.plusBtn = document.querySelector('.js-add');
        this.plusBtn.addEventListener('click', () => {
            let div = document.createElement('div');
            DataInputStep.createInput(div);
            DataInputStep.createWarning(div);
            this.plusBtn.before(div);
        });
    }

    addInputsHandler(){
        this.operRightContent.addEventListener('input', (e) => {
            if (e.target.classList.contains('js-numInput')) {
                Button.disable([this.page.nextBtn]);
                if (this._isCorrectInputs()) {
                    this._saveNumbers();
                } else {
                    return;
                }

                if (this._isTwoOrMoreNum()) {
                    Button.enable([this.page.nextBtn]);
                }
            }
        });
    }

    static createInput(elem) {
        let input = document.createElement('input');
        input.classList.add('operRightContent__input', 'js-numInput');
        elem.append(input);
    }

    static createWarning(elem) {
        let div = document.createElement('div');
        div.classList.add('operRightContent__warning');
        elem.append(div);
    }

    _isCorrectInputs() {
        let isCorrect = true;
        for (let input of this.inputs) {
            let warning = input.nextElementSibling;
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

    _isTwoOrMoreNum() {
        return !(this.page.numbers.length < 2);
    }

    _saveNumbers() {
        this.page.numbers = [];
        for (let input of this.inputs) {
            if (input.value !== '') {
                let value = Number(input.value).toFixed();
                this.page.numbers.push(value);
            }
        }
    }
}