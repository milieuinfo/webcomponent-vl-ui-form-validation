import {define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlSelect} from '/node_modules/vl-ui-select/dist/vl-select.js';
import {vlFormValidation} from '/src/vl-form-validation-all.js';

Promise.all([vlFormValidation.ready()]).then(() => define('vl-select-demo', VlSelectDemo, {extends: 'select'}));

export class VlSelectDemo extends VlSelect {}
