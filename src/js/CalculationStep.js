import Step from "./Step";
import operLeftSideTmp from '../hbs/operLeftSide.hbs';
import calculateTmp from '../hbs/calculate.hbs';

export default class CalculationStep extends Step {
    constructor(page) {
        super({
            email: page.email,
            stepFlag: 'calculation',
            leftSideTemplate: operLeftSideTmp,
            rightSideTemplate: calculateTmp,
            hideBtnsArr: [page.prevBtn, page.nextBtn]
        });

        this.page = page;
        page.sumResult = 0;
    }

    show() {
        this.render();
        this.page.sumResult = CalculationStep.calculate(this.page.numbers);
    }

    onNextPage(handler, ms) {
        setTimeout(function () {
            handler();
        }, ms);
    }

    static calculate(numbersArr) {
        let result = 0;
        for (let number of numbersArr) {
            number = Number(number);
            result += number;
        }
        return result;
    }
}