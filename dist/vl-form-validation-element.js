import {vlFormValidation} from '/node_modules/vl-ui-form-validation/dist/vl-form-validation.js';

/**
 * Gebruik de form validation element mixin in combinatie met elementen die formulier validatie bevatten.
 * @mixin vlFormValidationElement
 *
 * @param {Object} SuperClass - Class die als base class gebruikt zal worden.
 * @return {Object} class
 */
export const vlFormValidationElement = (SuperClass) => {
  return class extends SuperClass {
    static get formAssociated() {
      return true;
    }

    constructor(html) {
      super(html);
      this._internals = this.attachInternals();
    }

    disconnectedCallback() {
      if (this._observer) {
        this._observer.disconnect();
      }
    }

    /**
     * Returns the element's current validity state.
     *
     * @return {ValidityState}
     */
    get validity() {
      return this._internals.validity;
    }

    /**
     * Returns a localized message that describes the validation constraints that the control does not satisfy (if any). This is the empty string if the control is not a candidate for constraint validation (willvalidate is false), or it satisfies its constraints. This value can be set by the setCustomValidity method.
     *
     * @return {string}
     */
    get validationMessage() {
      return this._internals.validationMessage;
    }

    /**
     * Returns whether the element is a candidate for constraint validation.
     *
     * @return {boolean}
     */
    get willValidate() {
      return this._internals.willValidate;
    }

    /**
     * Sets a custom validity message for the element. If this message is not the empty string, then the element is suffering from a custom validity error, and does not validate.
     *
     * @param {string} message
     */
    setCustomValidity(message) {
      if (message) {
        this._internals.setValidity({customError: true}, message);
      } else {
        this._internals.setValidity({});
      }
    }

    /**
     * Returns true if the element's child controls are subject to constraint validation and satisfy those contraints; returns false if some controls do not satisfy their constraints. Fires an event named invalid at any control that does not satisfy its constraints; such controls are considered invalid if the event is not canceled. It is up to the programmer to decide how to respond to false.
     * @return {boolean}
     */
    checkValidity() {
      return this._internals.checkValidity();
    }

    /**
     * Returns true if the element's child controls satisfy their validation constraints. When false is returned, cancelable invalid events are fired for each invalid child and validation problems are reported to the user.
     * @return {boolean}
     */
    reportValidity() {
      return this._internals.reportValidity();
    }

    _dressFormValidation() {
      if (this.form) {
        this._setClassAttributes();
        this._observer = this._observeFormValidationClasses();
        Object.assign(this, vlFormValidation);
        this.dress(this.form);
      }
    }

    get _inputElement() {
      if (this.shadowRoot) {
        return this.shadowRoot.querySelector('input');
      }
    }

    _observeFormValidationClasses() {
      const observer = new MutationObserver((mutations) => {
        ['error', 'success'].forEach((type) => {
          if (mutations.find((mutation) => [...mutation.target.classList].find((clazz) => clazz.includes(`vl-form-validation--${type}`)))) {
            if (!this.hasAttribute(`data-vl-${type}`)) {
              this.setAttribute(`data-vl-${type}`, '');
            }
          } else {
            this.removeAttribute(`data-vl-${type}`);
          }
        });
      });
      observer.observe(this, {attributes: true, attributeFilter: ['class']});
      return observer;
    }

    _nameChangedCallback(oldValue, newValue) {
      if (this._inputElement && this._inputElement.name != newValue) {
        this._inputElement.name = newValue;
        this.setAttribute('name', newValue);
      }
    }

    _setClassAttributes() {
      this.setAttribute('data-vl-success-class', `vl-form-validation--success`);
      this.setAttribute('data-vl-error-class', `vl-form-validation--error`);
    }
  };
};
