import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlMultiSelect} from '/node_modules/vl-ui-multiselect/dist/vl-multiselect.js';
import {vlFormValidation} from '/src/vl-form-validation-all.js';

Promise.all([vlFormValidation.ready()]).then(() => define('vl-multiselect-demo', VlMultiSelectDemo, {extends: 'select'}));

export class VlMultiSelectDemo extends VlMultiSelect {}
