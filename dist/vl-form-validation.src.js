import { awaitUntil } from 'vl-ui-core';
import '@govflanders/vl-ui-util/dist/js/util.js';
import '@govflanders/vl-ui-core/dist/js/core.js';
import '@govflanders/vl-ui-form-validation/dist/js/form-validation.js';

/**
 * VlFormValidation
 * @class
 * @classdesc De formulier validatie verzekert dat bij het invullen van het formulier de input van de gebruiker geldig is.
 * 
 * @property {string} data-required - Attribuut wordt gebruikt om aan te duiden dat het veld verplicht is.
 * @property {string} data-vl-error-message - Attribuut wordt gebruikt om de tekst die verschijnt in de vl-form-validation component te bepalen.
 * @property {string} data-vl-error-placeholder - Attribuut wordt gebruikt om de koppeling met de bijhorende vl-form-validation component te maken met id attribuut `data-vl-error-id`.
 * @property {string} data-vl-success-class - Attribuut wordt gebruikt om de klasse te zetten die als een vl-form-validation component succesvol gevalideerd is.
 * @property {string} data-vl-error-class -  Attribuut wordt gebruikt om de klasse te zetten die als een vl-form-validation component foutief gevalideerd is.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-validation/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-validation/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-form-validation.html|Demo}
 */
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
            if (element.getAttribute('novalidate') == undefined) {
                vl.formValidation.dress(element);
            }
        }
    };
};
