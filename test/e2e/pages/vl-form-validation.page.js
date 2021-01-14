const {Page, Config} = require('vl-ui-core').Test;
const VlForm = require('../components/vl-form-validation-form');

class VlFormValidationPage extends Page {
  async getForm(number) {
    return new VlForm(this.driver, `#form-${number}`);
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-form-validation.html');
  }
}

module.exports = VlFormValidationPage;
