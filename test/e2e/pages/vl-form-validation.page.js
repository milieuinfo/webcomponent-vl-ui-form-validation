const VlFormValidation = require('../components/vl-form-validation');

const { Page, Config, VlElement } = require('vl-ui-core').Test;
// const { VlFormValidationMessage } = require('vl-ui-form-message').Test;
const { By, Key } = require('selenium-webdriver');


class VlFormValidationPage extends Page {

    async getFormMetVerplichtVeld() {
        return new DummyForm(this.driver, '#form-met-verplicht-veld');
    }

    async getFormMetVerplichtEmailVeld() {
        return new DummyForm(this.driver, '#form-met-email-veld');
    }

    async getFormMetVerplichtIbanVeld() {
        return new DummyForm(this.driver, '#form-met-iban-veld');
    }

    async getFormMetVerplichtTelefoonnummerVeld() {
        return new DummyForm(this.driver, '#form-met-telefoonnr-veld');
    }

    async getFormMetVerplichtDatumVeld() {
        return new DummyForm(this.driver, '#form-met-datum-veld');
    }

    async getFormMetVerplichtRRNVeld() {
        return new DummyForm(this.driver, '#form-met-rrn-veld');
    }

    async getFormMetVerplichtSelectVeld() {
        return new DummyForm(this.driver, '#form-met-select-veld');
    }

    async getSuccessFormMetVerplichtVeld() {
        return new DummyForm(this.driver, '#form-success-met-verplicht-veld');
    }

    async getFormZonderValidatie() {
        return new DummyForm(this.driver, '#form-zonder-validatie');
    }

    // async getVerplichteNaam() {
    //     return this._getInputField('#input-naam');
    // }


    
    

    // async _getFormValidationMessage(selector) {
    //     return new VlFormValidationMessage(this.driver, selector);
    // }

    // async _getInputField(selector) {
    //     return new DummyValidationField(this.driver, selector);
    // }

    // async getVoornaam(form) {
    //     return this._getInputField('#form-'+ form + '-voornaam');
    // }

    // async getValidationMessageVoornaam(form) {
    //     return this._getFormValidationMessage('#form-' + form +'-validation-message-voornaam');
    // }

    // async getNaam(form) {
    //     return this._getInputField('#form-' + form + '-naam');
    // }

    // async getValidationMessageNaam(form) {
    //     return this._getFormValidationMessage('#form-' + form + '-validation-message-naam');
    // }

    // async getEmail(form) {
    //     return this._getInputField('#form-' + form + '-email');
    // }

    // async getValidationMessageEmail(form) {
    //     return this._getFormValidationMessage('#form-' + form + '-validation-message-email');
    // }

    // async getIban(form) {
    //     return this._getInputField('#form-' + form + '-iban');
    // }

    // async getValidationMessageIban(form) {
    //     return this._getFormValidationMessage('#form-' + form + '-validation-message-iban');
    // }

    // async getTelefoonnummer(form) {
    //     return this._getInputField('#form-' + form + '-telefoonnr');
    // }

    // async getValidationMessageTelefoonnummer(form) {
    //     return this._getFormValidationMessage('#form-' + form + '-validation-message-telefoonnr');
    // }

    // async getRijksregisternummer(form) {
    //     return this._getInputField('#form-' + form + '-rijksregisternr');
    // }

    // async getValidationMessageRijksregisternummer(form) {
    //     return this._getFormValidationMessage('#form-' + form + '-validation-message-rrn');
    // }

    // async validateForm(form) {
    //     return this.driver.findElement(By.css('#form-' + form + '-button')).click();
    // }


    // async getFormZonderSuccesMelding() {
    //     return this.driver.findElement(By.css('#form-nosuccess'));
    // }

    // async getFormMetSuccesMelding() {
    //     return this.driver.findElement(By.css('#form-success'));
    // }

    // async getFormZonderValidatie() {
    //     return this.driver.findElement(By.css('#form-novalidation'));
    // }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-form-validation.html');
    }
}

class DummyForm extends VlElement {

    async getInputField() {
        const inputField =  await this.findElement(By.tagName('input'));
        return new DummyInputValidationField(this.driver, inputField);
    }

    // async getSubmitButton() {
    //     const submitButton = await this.findElement(By.tagName('button'));
    //     return new VlElement(this.driver, submitButton);
    // }

    async getErrorMessage() {
        const errorMessage = await this.findElement(By.css('.error-message'));
        return new DummyFormValidationMessage(this.driver, errorMessage);
    }

    async getSelectField() {
        const selectField = await this.findElement(By.tagName('select'));
        return new DummySelectValidationField(this.driver, selectField);
    }

    // async valideer() {
    //     const submitButton = await this.getSubmitButton();
    //     return submitButton.click();
    // }

}

class DummyInputValidationField extends VlFormValidation { 
    
    async setInputValue(content) {
        await this.clear();
        return this.sendKeys(content);
    }

    async getInputValue() {
        return this.getAttribute('value');
    }

    async blur() {
        return this.sendKeys(Key.TAB);
    }
}

class DummySelectValidationField extends VlFormValidation {

    async selectByIndex(index) {
        const options = await this.findElements(By.tagName('option'));
        await options[index].click();
        return this.blur();
    }

    async blur() {
        return this.sendKeys(Key.TAB);
    }
}

class DummyFormValidationMessage extends VlElement {

    async getErrorId() {
        return this.getAttribute('data-vl-error-id');
    }
   
}

module.exports = DummyInputValidationField;
module.exports = VlFormValidationPage;
