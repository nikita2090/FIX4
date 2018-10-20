export default class Animation {
    static fadeIn(elem, callback) {
        setTimeout(function () {
            elem.classList.add('fadeIn');
        }, 0);

        if (callback) {
            elem.addEventListener('transitionend', callback);
        }
    }

    static fadeOut(elem, callback) {
        elem.classList.add('fadeOut');
        elem.addEventListener('transitionend', callback);
    }
}