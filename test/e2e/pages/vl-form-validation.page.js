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

  async getFormMetErrorMessagesAlsAttribuut() {
    return this._getForm('form-met-error-messages-als-attribuut');
  }

  async getFormMetErrorMessagesViaPlaceholder() {
    return this._getForm('form-met-error-messages-via-placeholder');
  }
}

module.exports = VlFormValidationPage;
