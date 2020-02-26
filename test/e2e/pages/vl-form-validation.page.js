const VlFormValidation = require('../components/vl-form-validation');

const { Page, Config } = require('vl-ui-core').Test;
const { VlInputField } = require('vl-ui-input-field').Test;
const { By } = require('selenium-webdriver');


class VlFormValidationPage extends Page {
    async _getFormValidation(selector) {
        return new VlFormValidation(this.driver, selector);
    }

    async _getInputField(selector) {
        return new VlInputField(this.driver, selector);
    }

    async getVerplichteVoornaam() {
        return this._getInputField('#form-1-voornaam');
    }

    async getValidationMessageVerplichteVoornaam() {
        return this._getFormValidation('#form-1-validation-message-voornaam');
    }

    async getVerplichteNaam() {
        return this._getInputField('#form-1-naam');
    }

    async getValidationMessageVerplichteNaam() {
        return this._getFormValidation('#form-1-validation-message-naam');
    }

    async getVerplichteEmail() {
        return this._getInputField('#form-1-email');
    }

    async getValidationMessageVerplichteEmail() {
        return this._getFormValidation('#form-1-validation-message-email');
    }

    async getVerplichteIban() {
        return this._getInputField('#form-1-iban');
    }

    async getValidationMessageVerplichteIban() {
        return this._getFormValidation('#form-1-validation-message-iban');
    }

    async getVerplichtTelefoonnummer() {
        return this._getInputField('#form-1-telefoonnr');
    }

    async getValidationMessageVerplichtTelefoonnummer() {
        return this._getFormValidation('#form-1-validation-message-telefoonnr');
    }

    async getVerplichtRijksregisternummer() {
        return this._getInputField('#form-1-rijksregisternr');
    }

    async getValidationMessageRijksregisternummer() {
        return this._getFormValidation('#form-1-validation-message-rrn');
    }

    async validateFirstForm() {
        return this.driver.findElement(By.css('#form-1-button')).click();
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-form-validation.html');
    }
}

module.exports = VlFormValidationPage;
