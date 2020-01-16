const VlFormValidation = require('../components/vl-form-validation');
const { Page } = require('vl-ui-core');
const { Config } = require('vl-ui-core');

class VlFormValidationPage extends Page {
    async _getFormValidation(selector) {
        return new VlFormValidation(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-form-validation.html');
    }
}

module.exports = VlFormValidationPage;
