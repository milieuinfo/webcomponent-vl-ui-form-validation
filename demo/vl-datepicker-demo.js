import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlDatepicker} from '/node_modules/vl-ui-datepicker/dist/vl-datepicker.js';
import {vlFormValidation} from '/src/vl-form-validation.js';

Promise.all([
  vlFormValidation.ready(),
]).then(() => {
  define('vl-datepicker-demo', VlDatepickerDemo);
});

export class VlDatepickerDemo extends VlDatepicker {
  connectedCallback() {
    super.connectedCallback();
    this._dressFormValidation();
  }

  get name() {
    return this.getAttribute('name');
  }

  get form() {
    return this.closest('form');
  }

  _dressFormValidation() {
    if (this.form) {
      this.setAttribute('data-vl-success-class', 'vl-input-field--success');
      this.setAttribute('data-vl-error-class', 'vl-input-field--error');
      Object.assign(this, vlFormValidation);
      this.dress(this.form);
      this._observer = this._observeFormValidationClasses();
    }
  }

  _observeFormValidationClasses() {
    const observer = new MutationObserver((mutations) => {
      ['error', 'success'].forEach((type) => {
        if (mutations.find((mutation) => mutation.target.classList.contains(`vl-datepicker--${type}`))) {
          this.setAttribute(`data-vl-${type}`, '');
        } else {
          this.removeAttribute(`data-vl-${type}`);
        }
      });
    });
    observer.observe(this, {attributes: true, attributeFilter: ['class']});
    return observer;
  }
}
