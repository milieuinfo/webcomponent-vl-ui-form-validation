import {nativeVlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {vlFormValidation, vlFormValidationElement} from '/src/vl-form-validation-all.js';

vlFormValidation.ready().then(() => define('vl-form-validation-input', VlFormValidationInput, {extends: 'input'}));

class VlFormValidationInput extends vlFormValidationElement(nativeVlElement(HTMLInputElement)) {
  static get _observedAttributes() {
    return vlFormValidation._observedAttributes();
  }

  connectedCallback() {
    this._dressFormValidation();
  }
}
