import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlInputField} from '/node_modules/vl-ui-input-field/dist/vl-input-field.js';
import {vlFormValidation} from '/src/vl-form-validation.js';

Promise.all([
  vlFormValidation.ready(),
]).then(() => {
  define('vl-input-field-demo', VlInputFieldDemo, {extends: 'input'});
});

export class VlInputFieldDemo extends VlInputField {
  connectedCallback() {
    super.connectedCallback();
    this._dressFormValidation();
  }

  _dressFormValidation() {
    if (this.form) {
      this.setAttribute('data-vl-success-class', 'vl-input-field--success');
      this.setAttribute('data-vl-error-class', 'vl-input-field--error');
      Object.assign(this, vlFormValidation);
      this.dress(this.form);
    }
  }
}
