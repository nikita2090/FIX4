import Step from "./Step";
import Button from './Button';
import Table from './Table';
import operLeftSideTmp from '../hbs/operLeftSide.hbs';
import confirmDataTmp from '../hbs/confirmData.hbs';

export default class ConfirmDataStep extends Step {
    constructor(page) {
        super({
            stepFlag: 'confirmData',
            email: page.email,
            leftSideTemplate: operLeftSideTmp,
            rightSideTemplate: confirmDataTmp,
            enableBtnsArr: [page.prevBtn]

        });
        this.page = page;

        this.render();

        this.confirmTable = document.querySelector('.js-confirmTable');
        Table.create(this.confirmTable, page.numbers, 'beforeEnd');
        this.sortedNumbers = page.numbers.slice();
        this.sortBtn = document.querySelector('.sortBtn');
        this.filterInput = document.querySelector('.js-filter');
        this.filteredNumbers = null;

        this.addSortBtnHandler();
        this.addFilterInputHandler();
    }

    addSortBtnHandler() {
        this.sortBtn.addEventListener('click', () => {
            if (this.sortBtn.classList.contains('ByDescending')) {
                Button.rename(this.sortBtn, 'Данные &#8593;');
                this.sortedNumbers.sort(sortByDescending);
                this.sortBtn.classList.remove('ByDescending');
            } else {
                Button.rename(this.sortBtn, 'Данные &#8595;');
                this.sortedNumbers.sort(sortByAscending);
                this.sortBtn.classList.add('ByDescending');
            }
            Table.clean(this.confirmTable);
            Table.create(this.confirmTable, this.sortedNumbers, 'beforeEnd');

            function sortByAscending(a, b) {
                return a - b;
            }

            function sortByDescending(a, b) {
                return b - a;
            }
        });
    }

    addFilterInputHandler() {
        this.filterInput.addEventListener('input', () => {
            if (isNaN(this.filterInput.value)) return;
            Table.clean(this.confirmTable);
            if (this.filterInput.value === '') {
                Table.create(this.confirmTable, this.sortedNumbers, 'beforeEnd');
            } else {
                this.filteredNumbers = ConfirmDataStep.findNumber(this.filterInput.value, this.page.numbers);
                console.log(this.filteredNumbers);
                if (this.filteredNumbers.length === 0) {
                    this.filteredNumbers.push('Ничего не найдено');
                }
                Table.create(this.confirmTable, this.filteredNumbers, 'beforeEnd');
            }
        });

    }

    static findNumber(number, arr) {
        let result = [];
        for (let n of arr) {
            if (n === number) {
                result.push(n);
            }
        }
        return result;
    }
}