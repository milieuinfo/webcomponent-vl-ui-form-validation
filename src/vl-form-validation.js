import {awaitUntil} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/@govflanders/vl-ui-util/dist/js/util.js';
import '/node_modules/@govflanders/vl-ui-core/dist/js/core.js';
import '/lib/form-validation.js';

/**
 * De formulier validatie mixin in combinatie met een input field verzekert dat bij het invullen van het formulier de input van de gebruiker geldig is.
 * @mixin vlFormValidation
 *
 * @property {string} data-required - Attribuut wordt gebruikt om aan te duiden dat het veld verplicht is.
 * @property {string} data-vl-error-message - Attribuut wordt gebruikt om de tekst die verschijnt in de vl-form-validation component te bepalen.
 * @property {string} data-vl-error-placeholder - Attribuut wordt gebruikt om de koppeling met de bijhorende vl-form-validation component te maken met id attribuut `data-vl-error-id`.
 * @property {string} data-vl-success-class - Attribuut wordt gebruikt om de klasse te zetten als een vl-form-validation component succesvol gevalideerd is.
 * @property {string} data-vl-error-class -  Attribuut wordt gebruikt om de klasse te zetten als een vl-form-validation component foutief gevalideerd is.
 * @property {boolean} data-vl-numericality-only-integer -  Attribuut wordt gebruikt om aan te geven dat voor de numericality validatie enkel gehele getallen geldig zijn.
 * @property {number} data-vl-numericality-greater-than -  Attribuut wordt gebruikt om aan te geven dat voor de numericality validatie het getal groter moet zijn dan het getal in dit attribuut.
 * @property {number} data-vl-numericality-greater-than-or-equal-to -  Attribuut wordt gebruikt om aan te geven dat voor de numericality validatie het getal groter of gelijk moet zijn aan het getal in dit attribuut.
 * @property {number} data-vl-numericality-less-than -  Attribuut wordt gebruikt om aan te geven dat voor de numericality validatie het getal kleiner moet zijn dan het getal in dit attribuut.
 * @property {number} data-vl-numericality-less-than-or-equal-to -  Attribuut wordt gebruikt om aan te geven dat voor de numericality validatie het getal kleiner of gelijk moet zijn aan het getal in dit attribuut.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-validation/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-validation/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-form-validation.html|Demo}
 */
export const vlFormValidation = {
  /**
   * Wacht tot de form validatie initialisatie klaar is.
   *
   * @return {Promise}
   */
  ready() {
    return awaitUntil(() => window.vl && window.vl.formValidation);
  },

  /**
   * Initialiseer de form validatie.
   *
   * @param {HTMLElement} element
   */
  dress(element) {
    if (element && element.getAttribute('novalidate') == undefined && !element.hasAttribute('data-vl-formvalidation-dressed')) {
      vl.formValidation.dress(element);
    }
  },

  _observedAttributes() {
    return ['name', 'required'];
  },
};

export const VlFormValidation = vlFormValidation;
