import tableTmp from '../hbs/table.hbs';

export default class Table {
    static create(target, arr, place) {
        let html = tableTmp({
            num: arr
        });
        target.insertAdjacentHTML(place, html);
    }

    static clean(parent) {
        let children = parent.rows;
        for (let i = children.length - 1; i > 0; i--) {
            parent.removeChild(children[i]);
        }
    }
}