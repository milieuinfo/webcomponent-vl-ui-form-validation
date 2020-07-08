import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {vlFormValidation} from '/src/vl-form-validation.js';

vlFormValidation.ready().then(() => define('vl-form-validation-test', VlFormValidationTest));

class VlFormValidationTest extends vlElement(HTMLElement) {
  constructor() {
    super(`
      <form data-vl-validate-form>
        <label class="vl-form__label" for="validation-naam">Naam</label>
        <div class="vl-input-group">
          <input name="validation-naam" type="text" data-required="true" data-vl-success-class="success-style" data-vl-error-class="error-style" data-vl-error-message="Veld &quot;Naam&quot; is verplicht" data-vl-error-placeholder="validation-naam-error" aria-required="true" aria-invalid="true" />
        </div>
        <div class="error-message" data-vl-error-id="validation-naam-error"></div>
      </form>
    `);
  }

  get formElement() {
    return this.shadowRoot.querySelector('form');
  }

  connectedCallback() {
    Object.assign(this, vlFormValidation);
    this.dress(this.formElement);
  }
}
