import Button from './Button';
import Animation from './Animation';

export default class Step {
    constructor(options) {
        this.email = options.email;
        this.stepFlag = options.stepFlag;
        this.leftSideTemplate = options.leftSideTemplate;
        this.leftContentWrap = document.querySelector('.js-operLeftContent');
        this.operNames = {
            dataInput: 'Шаг 1. Ввод данных',
            confirmData: 'Шаг 2. Подтверждение данных',
            calculation: 'Шаг 3. Расчет',
            result: 'Результат'
        };
        this.operTexts = {
            dataInput: 'Введите в поля минимум 2 целых неотрицательных числа.' +
            '<br> Нажмите кнопку "+" чтобы добавить поле.' +
            '<br> Нажмите "Продолжить" для перехода к следующему шагу.',
            confirmData: 'Проверьте введенные данные.' +
            '<br>Вы можете отсортировать данные по возрастанию и убыванию нажимая на "Данные".',
            calculation: 'Подождите немного',
            result: 'Ваш результат. Хорошего дня!'
        };

        this.renameBtnElem = options.renameBtnElem;
        this.renameBtnName = options.renameBtnName;
        this.resizeBtnElem = options.resizeBtnElem;
        this.resizeBtnSize = options.resizeBtnSize;
        this.hideBtnsArr = options.hideBtnsArr;
        this.showBtnsArr = options.showBtnsArr;
        this.disableBtnsArr = options.disableBtnsArr;
        this.enableBtnsArr = options.enableBtnsArr;
        this.rightSideTemplate = options.rightSideTemplate;
        this.rightContentWrap = document.querySelector('.js-operRightContent');
        this.result = options.result;
    }

    render() {
        if (this.renameBtnElem && this.renameBtnName) {
            Button.rename(this.renameBtnElem, this.renameBtnName);
        }

        if (this.resizeBtnElem && this.resizeBtnSize) {
            Button.resize(this.resizeBtnElem, this.resizeBtnSize);
        }

        if (this.hideBtnsArr) Button.hide(this.hideBtnsArr);

        if (this.showBtnsArr) Button.show(this.showBtnsArr);

        if (this.disableBtnsArr) Button.disable(this.disableBtnsArr);

        if (this.enableBtnsArr) Button.enable(this.enableBtnsArr);

        this._renderRightSide();
        this._renderLeftSide();

        let addedContent = document.querySelector('.addedContent');
        Animation.fadeIn(addedContent);
    }

    _renderRightSide() {
        this.rightContentWrap.innerHTML = this.rightSideTemplate({result: this.result});
    }

    _renderLeftSide() {
        this.leftContentWrap.innerHTML = this.leftSideTemplate({
            email: this.email,
            operationName: this.operNames[this.stepFlag],
            operationText: this.operTexts[this.stepFlag]
        });
    }
}