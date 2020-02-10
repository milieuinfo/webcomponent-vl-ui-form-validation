const VlFormMessage = require('../components/vl-form-message');
const { Page, Config } = require('vl-ui-core').Test;

class VlFormMessagePage extends Page {
    async _getFormMessage(selector) {
        return new VlFormMessage(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-form-message.html');
    }
}

module.exports = VlFormMessagePage;
