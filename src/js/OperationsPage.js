import Page from './Page';

export default class OperationsPage extends Page{
    constructor(options){
        super(options);
        this.operFlag = null;
        this.numbers = [];
        this.sumResult = 0;
    }

    addPrevBtnHandler(handler){
        this.prevBtn = document.querySelector('.js-prevBtn');
        //this.prevBtn.addEventListener('click', handler);
    }

    addNextBtnHandler(handler){
        this.nextBtn = document.querySelector('.js-nextBtn');
        //this.nextBtn.addEventListener('click', handler);
    }
}
