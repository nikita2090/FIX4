export default class Page {
    constructor(options) {
        this.pageTitle = options.pageTitle;
        this.template = options.template;
        this.title = options.title;
        this.subtitle = options.subtitle;
        this.description = options.description;
        this.btnName = options.btnName;
    }

    render() {
        this.renderTitle();

        document.body.innerHTML = this.template({
            title: this.title,
            subtitle: this.subtitle,
            description: this.description,
            btnName: this.btnName
        });
    }

    renderTitle(title) {
        document.head.querySelector('title').innerHTML = title || this.pageTitle;
    }
}