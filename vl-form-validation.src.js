import { awaitScript, awaitUntil } from '/node_modules/vl-ui-core/vl-core.js';

awaitScript('util', '/node_modules/@govflanders/vl-ui-util/dist/js/util.min.js');
awaitScript('core', '/node_modules/@govflanders/vl-ui-core/dist/js/core.min.js');
awaitScript('form-validation', '/node_modules/@govflanders/vl-ui-form-validation/dist/js/form-validation.js');

export const VlFormValidation = (SuperClass) => {
    return class extends SuperClass {
        /**
         * Wacht tot de form validatie initialisatie klaar is.
         * 
         * @returns {Promise}
         */
        static awaitUntilReady() {
            return awaitUntil(() => window.vl && window.vl.formValidation);
        }
    
        /**
         * Initialiseer de form validatie.
         * 
         * @param {HTMLElement} element
         */
        dress(element) {
            vl.formValidation.dress(element);
        }
    };
};