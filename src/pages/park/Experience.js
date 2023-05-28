export default class Experience {
    static instance;
    constructor(_options = {}) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;

        this.targetElement = _options.targetElement;
        console.log('dom节点', this.targetElement)
    }
}