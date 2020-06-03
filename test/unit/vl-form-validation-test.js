import { define, VlElement } from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/@govflanders/vl-ui-util/dist/js/util.js';
import '/node_modules/@govflanders/vl-ui-core/dist/js/core.js';
import '/lib/form-validation.js';

class VlFormValidationTest extends VlElement(HTMLElement) {
    constructor() {
        super(`
            <form data-vl-validate-form>
                <label class="vl-form__label" for="validation-naam">Naam</label>
                <div class="vl-input-group">
                    <input name="validation-naam" type="text" data-required="true" data-vl-success-class="success-style"
                        data-vl-error-class="error-style" data-vl-error-message="Veld &quot;Naam&quot; is verplicht"
                        data-vl-error-placeholder="validation-naam-error" aria-required="true" aria-invalid="true" />
                </div>
                <div class="error-message" data-vl-error-id="validation-naam-error"></div>
            </form>
        `);
    }

    get formElement() {
        return this.shadowRoot.querySelector('form');
    }

    connectedCallback() {
        vl.formValidation.dress(this.formElement);
    }
}

define('vl-form-validation-test', VlFormValidationTest);