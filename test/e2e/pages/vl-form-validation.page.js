const VlFormValidation = require('../components/vl-form-validation');

const { Page, Config } = require('vl-ui-core').Test;
const { VlInputField } = require('vl-ui-input-field').Test;
const { VlFormValidationMessage } = require('vl-ui-form-message').Test;
const { By } = require('selenium-webdriver');


class VlFormValidationPage extends Page {
    async _getFormValidationMessage(selector) {
        return new VlFormValidationMessage(this.driver, selector);
    }

    async _getInputField(selector) {
        return new VlInputField(this.driver, selector);
    }

    async getVoornaam(form) {
        return this._getInputField('#form-'+ form + '-voornaam');
    }

    async getValidationMessageVoornaam(form) {
        return this._getFormValidationMessage('#form-' + form +'-validation-message-voornaam');
    }

    async getNaam(form) {
        return this._getInputField('#form-' + form + '-naam');
    }

    async getValidationMessageNaam(form) {
        return this._getFormValidationMessage('#form-' + form + '-validation-message-naam');
    }

    async getEmail(form) {
        return this._getInputField('#form-' + form + '-email');
    }

    async getValidationMessageEmail(form) {
        return this._getFormValidationMessage('#form-' + form + '-validation-message-email');
    }

    async getIban(form) {
        return this._getInputField('#form-' + form + '-iban');
    }

    async getValidationMessageIban(form) {
        return this._getFormValidationMessage('#form-' + form + '-validation-message-iban');
    }

    async getTelefoonnummer(form) {
        return this._getInputField('#form-' + form + '-telefoonnr');
    }

    async getValidationMessageTelefoonnummer(form) {
        return this._getFormValidationMessage('#form-' + form + '-validation-message-telefoonnr');
    }

    async getRijksregisternummer(form) {
        return this._getInputField('#form-' + form + '-rijksregisternr');
    }

    async getValidationMessageRijksregisternummer(form) {
        return this._getFormValidationMessage('#form-' + form + '-validation-message-rrn');
    }

    async validateForm(form) {
        return this.driver.findElement(By.css('#form-' + form + '-button')).click();
    }


    async getFormZonderSuccesMelding() {
        return this.driver.findElement(By.css('#form-nosuccess'));
    }

    async getFormMetSuccesMelding() {
        return this.driver.findElement(By.css('#form-success'));
    }

    async getFormZonderValidatie() {
        return this.driver.findElement(By.css('#form-novalidation'));
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-form-validation.html');
    }
}

module.exports = VlFormValidationPage;
