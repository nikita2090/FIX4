import Step from "./Step";

export default class DataInputStep extends Step {
    constructor(options) {
        super(options);
        //this.plusBtn = document.querySelector('.js-add');
        this.addBtnHandler = this.addBtnHandler.bind(this);
    }

    addPlusBtnListener() {
        this.plusBtn = document.querySelector('.js-add');
        this.plusBtn.addEventListener('click', () => {
            this.addBtnHandler();
        });
    }

    addBtnHandler() {
        console.log(this);
        console.log(this.plusBtn);
        this._createInputRow(this.plusBtn);
    }

    _createInputRow(el) {
        let div = document.createElement('div');
        this._createInput(div);
        this._createWarning(div);
        el.before(div);
    }

    _createInput(elem) {
        let input = document.createElement('input');
        input.classList.add('operRightContent__input', 'js-numInput');
        elem.append(input);
    }

    _createWarning(elem) {
        let div = document.createElement('div');
        div.classList.add('operRightContent__warning');
        elem.append(div);
    }
}