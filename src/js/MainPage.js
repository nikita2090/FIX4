import Page from './Page';

export default class MainPage extends Page{
    addBtnListener(listener){
        let mainBtn = document.querySelector('.js-mainContent__btn');
        mainBtn.addEventListener('click', listener);
    }
}