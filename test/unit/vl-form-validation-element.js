import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {vlFormValidation, vlFormValidationElement} from '/src/vl-form-validation-all.js';

vlFormValidation.ready().then(() => define('vl-form-validation-element', VlFormValidationHTMLElement));

class VlFormValidationHTMLElement extends vlFormValidationElement(vlElement(HTMLElement)) {
  static get _observedAttributes() {
    return vlFormValidation._observedAttributes();
  }

  constructor() {
    super(`
      <div>
        <input type="text"/>
      </div>
    `);
  }

  connectedCallback() {
    this._dressFormValidation();
  }
}
