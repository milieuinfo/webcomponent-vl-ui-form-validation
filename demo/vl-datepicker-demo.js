import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlDatepicker} from '/node_modules/vl-ui-datepicker/dist/vl-datepicker.js';
import {vlFormValidation, vlFormValidationElement} from '/src/vl-form-validation-all.js';

Promise.all([
  vlFormValidation.ready(),
]).then(() => {
  define('vl-datepicker-demo', VlDatepickerDemo);
});

export class VlDatepickerDemo extends vlFormValidationElement(VlDatepicker) {
  connectedCallback() {
    super.connectedCallback();
    this._dressFormValidation();
  }
}
