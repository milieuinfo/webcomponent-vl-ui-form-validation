const VlFormValidation = require('./vl-form-validation');

const { VlElement } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;
const { Key } = require('selenium-webdriver');

class DummyForm extends VlElement {

    async getInputField() {
        const inputField =  await this.findElement(By.tagName('input'));
        return new DummyInputValidationField(this.driver, inputField);
    }

    async getErrorMessage() {
        const errorMessage = await this.findElement(By.css('.error-message'));
        return new DummyFormValidationMessage(this.driver, errorMessage);
    }

    async getSelectField() {
        const selectField = await this.findElement(By.tagName('select'));
        return new DummySelectValidationField(this.driver, selectField);
    }
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

module.exports = DummyForm;
