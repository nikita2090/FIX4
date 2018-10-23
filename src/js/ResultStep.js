import Step from "./Step";
import Table from './Table';
import operLeftSideTmp from '../hbs/operLeftSide.hbs';
import resultTmp from '../hbs/result.hbs';

export default class ResultStep extends Step {
    constructor(page) {
        super({
            email: page.email,
            stepFlag: 'result',
            leftSideTemplate: operLeftSideTmp,
            rightSideTemplate: resultTmp,
            result: page.sumResult,
            renameBtnElem: page.prevBtn,
            renameBtnName: 'Вернутся к вводу данных',
            resizeBtnElem: page.prevBtn,
            resizeBtnSize: 'big',
            showBtnsArr: [page.prevBtn],
        });
        this.page = page;
    }

    show() {
        this.render();
        this.resultTable = document.querySelector('.js-result');
        this.firstTableRow = this.resultTable.firstElementChild;
        Table.create(this.firstTableRow, this.page.numbers, 'afterEnd');
        ResultStep.paintRows(this.resultTable);
    }

    static paintRows(parent) {
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