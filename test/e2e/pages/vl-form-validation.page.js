const {Page, Config} = require('vl-ui-core').Test;
const DummyForm = require('../components/dummy-components');

class VlFormValidationPage extends Page {
  async getFormMetVerplichtVeld() {
    return new DummyForm(this.driver, '#form-met-verplicht-veld');
  }

  async getFormMetVerplichtEmailVeld() {
    return new DummyForm(this.driver, '#form-met-email-veld');
  }

  async getFormMetVerplichtIbanVeld() {
    return new DummyForm(this.driver, '#form-met-iban-veld');
  }

  async getFormMetVerplichtTelefoonnummerVeld() {
    return new DummyForm(this.driver, '#form-met-telefoonnr-veld');
  }

  async getFormMetVerplichtDatumVeld() {
    return new DummyForm(this.driver, '#form-met-datum-veld');
  }

  async getFormMetVerplichtRRNVeld() {
    return new DummyForm(this.driver, '#form-met-rrn-veld');
  }

  async getFormMetVerplichtSelectVeld() {
    return new DummyForm(this.driver, '#form-met-select-veld');
  }

  async getSuccessFormMetVerplichtVeld() {
    return new DummyForm(this.driver, '#form-success-met-verplicht-veld');
  }

  async getFormZonderValidatie() {
    return new DummyForm(this.driver, '#form-zonder-validatie');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-form-validation-e2e.html');
  }
}

module.exports = VlFormValidationPage;
