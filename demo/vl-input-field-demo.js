import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlInputField} from '/node_modules/vl-ui-input-field/dist/vl-input-field.js';
import {vlFormValidation, vlFormValidationElement} from '/src/vl-form-validation-all.js';

Promise.all([
  vlFormValidation.ready(),
]).then(() => {
  define('vl-input-field-demo', VlInputFieldDemo, {extends: 'input'});
});

export class VlInputFieldDemo extends vlFormValidationElement(VlInputField) {
  static get _observedAttributes() {
    return vlFormValidation._observedAttributes();
  }

  connectedCallback() {
    super.connectedCallback();
    this._dressFormValidation();
  }
}
