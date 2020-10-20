import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlCheckbox} from '/node_modules/vl-ui-checkbox/dist/vl-checkbox.js';
import {vlFormValidation, vlFormValidationElement} from '/src/vl-form-validation-all.js';

Promise.all([
  vlFormValidation.ready(),
]).then(() => {
  define('vl-checkbox-demo', VlCheckboxDemo);
});

export class VlCheckboxDemo extends vlFormValidationElement(VlCheckbox) {
  connectedCallback() {
    super.connectedCallback();
    this._dressFormValidation();
  }
}
