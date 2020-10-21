import {vlFormValidation} from '/src/vl-form-validation.js';

/**
 * Gebruik de form validation element mixin in combinatie met elementen die formulier validatie bevatten.
 * @mixin vlFormValidationElement
 *
 * @param {Object} SuperClass - Class die als base class gebruikt zal worden.
 * @return {Object} class
 */
export const vlFormValidationElement = (SuperClass) => {
  return class extends SuperClass {
    connectedCallback() {
      this._setClassAttributes();
      this._observer = this._observeFormValidationClasses();
    }

    disconnectedCallback() {
      if (this._observer) {
        this._observer.disconnect();
      }
    }

    _dressFormValidation() {
      if (this.form) {
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
          if (mutations.find((mutation) => mutation.target.classList.contains(`${this.localName}--${type}`))) {
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
      this.setAttribute('data-vl-success-class', `${this.localName}--success`);
      this.setAttribute('data-vl-error-class', `${this.localName}--error`);
    }
  };
};
