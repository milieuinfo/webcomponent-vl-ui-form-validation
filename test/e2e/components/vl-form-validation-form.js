const {VlElement} = require('vl-ui-core').Test;
const {VlInputField} = require('vl-ui-input-field').Test;
const {VlSelect} = require('vl-ui-select').Test;
const {VlDatepicker} = require('vl-ui-datepicker').Test;
const {VlButton} = require('vl-ui-button').Test;
const vlFormValidation = require('./vl-form-validation');

class VlForm extends VlElement {
  async getInputField(naam) {
    return this._getInputField(naam);
  }

  async getSelect(naam) {
    return this._getSelect(naam);
  }

  async getDatepicker(naam) {
    return this._getDatepicker(naam);
  }

  async submit(form) {
    const button = await this._getSubmitButton(form);
    await button.click();
  }

  async _getSubmitButton(form) {
    return new VlButton(this.driver, `#button-form${form}`);
  }

  async _getInputField(naam) {
    const input = await new VlInputField(this.driver, `#input-${naam}`);
    Object.assign(input, vlFormValidation);
    return input;
  }

  async _getSelect(naam) {
    const select = await new VlSelect(this.driver, `#select-${naam}`);
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
