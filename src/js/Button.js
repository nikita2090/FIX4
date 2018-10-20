export default class Button {
    static rename(btn, html) {
        btn.innerHTML = html;
    }

    static resize(btn, size) {
        if (size === 'small') {
            btn.classList.remove('operRightButtons__bigBtn');
        } else if (size === 'big') {
            btn.classList.add('operRightButtons__bigBtn');
        }
    }

    static hide(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].style.display = 'none';
        }
    }

    static show(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].style.display = 'inline-block';
        }
    }

    static disable(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].disabled = true;
        }
    }

    static enable(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].disabled = false;
        }
    }
}