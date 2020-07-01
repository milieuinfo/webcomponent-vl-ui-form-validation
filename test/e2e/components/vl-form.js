const {VlElement} = require('vl-ui-core').Test;
const {VlInputField} = require('vl-ui-input-field').Test;
const {VlSelect} = require('vl-ui-select').Test;
const {VlButton} = require('vl-ui-button').Test;
const vlFormValidation = require('./vl-form-validation');

class VlForm extends VlElement {
  async getInputField(number) {
    return this._getInputField(number);
  }

  async getSelect(number) {
    return this._getSelect(number);
  }

  async submit() {
    const button = await this._getSubmitButton();
    await button.click();
  }

  async _getSubmitButton() {
    return new VlButton(this.driver, '[is="vl-button"]');
  }

  async _getInputField(number) {
    const input = await new VlInputField(this.driver, `#input-${number}`);
    Object.assign(input, vlFormValidation);
    return input;
  }

  async _getSelect(number) {
    const select = await new VlSelect(this.driver, `#select-${number}`);
    Object.assign(select, vlFormValidation);
    return select;
  }
}

module.exports = VlForm;
