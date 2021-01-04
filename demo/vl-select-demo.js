import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlSelect} from '/node_modules/vl-ui-select/dist/vl-select.js';
import {vlFormValidation, vlFormValidationElement} from '/src/vl-form-validation-all.js';

Promise.all([
  vlFormValidation.ready(),
]).then(() => {
  define('vl-select-demo', VlSelectDemo, {extends: 'select'});
});

export class VlSelectDemo extends vlFormValidationElement(VlSelect) {
  static get _observedAttributes() {
    return VlSelect._observedAttributes.concat(vlFormValidation._observedAttributes());
  }

  connectedCallback() {
    super.connectedCallback();
    this._dressFormValidation();
  }
}
