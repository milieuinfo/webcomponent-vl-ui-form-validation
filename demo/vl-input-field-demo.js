import {nativeVlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {vlFormValidation} from '/src/vl-form-validation.js';

Promise.all([
  vlFormValidation.ready(),
]).then(() => {
  define('vl-input-field-demo', VlInputFieldDemo, {extends: 'input'});
});

/**
* VlInputField
* @class
* @classdesc Het input field laat de gebruiker toe om een informatie in te vullen in uw applicatie: bijvoorbeeld een email adres of een wachtwoord.
*
* @extend HTMLInputElement
*
* @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-input-field/releases/latest|Release notes}
* @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-input-field/issues|Issues}
* @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-input-field.html|Demo}
*/
export class VlInputFieldDemo extends nativeVlElement(HTMLInputElement) {
  static get _observedChildClassAttributes() {
    return ['block', 'small', 'error', 'success', 'disabled'];
  }

  connectedCallback() {
    this.classList.add('vl-input-field');
    this._dress();
  }

  get _classPrefix() {
    return 'vl-input-field--';
  }

  _dress() {
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
