const { VlElement } = require('vl-ui-core').Test;

class VlFormValidation extends VlElement {
    async isRequired() {
        return this.hasAttribute('data-required');
    }

    async getErrorMessage() {
        return this.getAttribute('data-vl-error-message');
    }

    async getErrorPlaceholder() {
        return this.getAttribute('data-vl-error-placeholder');
    }

    async getErrorClass() {
        return this.getAttribute('data-vl-error-class');
    }

    async getSuccessClass() {
        return this.getAttribute('data-vl-success-class')
    }

    async hasError() {
        const errorClass = await this.getErrorClass();
        return this.hasClass(errorClass);
    }

    async isSuccess() {
        const successClass = await this.getSuccessClass();
        return this.hasClass(successClass);
    }
}

module.exports = VlFormValidation;
