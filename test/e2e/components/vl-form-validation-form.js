const {VlElement} = require('vl-ui-core').Test;
const {VlInputField} = require('vl-ui-input-field').Test;
const {VlSelect} = require('vl-ui-select').Test;
const {VlDatepicker} = require('vl-ui-datepicker').Test;
const {VlButton} = require('vl-ui-button').Test;
const vlFormValidation = require('./vl-form-validation');

class VlForm extends VlElement {
  async getInputField(id) {
    return this._getInputField(id);
  }

  async getSelect(id) {
    return this._getSelect(id);
  }

  async getDatepicker(naam) {
    return this._getDatepicker(naam);
  }

  async submit() {
    const button = await this._getSubmitButton();
    await button.click();
  }

  async _getSubmitButton() {
    return new VlButton(this.driver, `${this.selector} [is="vl-button"]`);
  }

  async _getInputField(id) {
    const input = await new VlInputField(this.driver, `#${id}`);
    Object.assign(input, vlFormValidation);
    return input;
  }

  async _getSelect(id) {
    const select = await new VlSelect(this.driver, `#${id}`);
    Object.assign(select, vlFormValidation);
    return select;
  }

  async _getDatepicker(naam) {
    const datepicker = await new VlDatepicker(this.driver, `#datepicker-${naam}`);
    Object.assign(datepicker, vlFormValidation);
    return datepicker;
  }
}

module.exports = VlForm;
