const {Page, Config} = require('vl-ui-core').Test;
const VlForm = require('../components/vl-form-validation-form');

class VlFormValidationPage extends Page {
  async getForm(number) {
    return new VlForm(this.driver, `#form-${number}`);
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-form-validation.html');
  }

  async _getForm(id) {
    return new VlForm(this.driver, `#${id}`);
  }

  async getFormWithErrorMessageAttributes() {
    return this._getForm('form-with-error-message-attributes');
  }

  async getFormWithErrorMessageElements() {
    return this._getForm('form-with-error-message-elements');
  }
}

module.exports = VlFormValidationPage;
