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
}

module.exports = VlFormValidation;
