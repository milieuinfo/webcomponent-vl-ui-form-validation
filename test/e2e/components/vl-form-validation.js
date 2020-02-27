const { VlElement } = require('vl-ui-core').Test;


class VlFormValidation extends VlElement {  
   
    // async getErrorId() {
    //     return this.getAttribute('data-vl-error-id');
    // }

    async hasDataRequired() {
        return this.hasAttribute('data-required');
    }

    async getErrorMessage() {
        return this.getAttribute('data-vl-error-message');
    }

    async getErrorPlaceholder() {
        return this.getAttribute('data-vl-error-placeholder');
    }

    // static async elementHasisDataRequired(element) {
    //     return element.hasAttribute('data-required');
    // }

    // static async getErrorPlaceholder(element) {
    //     return element.getAttribute('data-vl-error-placeholder');
    // }

    // async toontFoutmeldingenVoorElement(element) {
    //     const errorId = await this.getErrorId();
    //     const errorPlaceholderIdFromElement = await VlFormValidation.getErrorPlaceholder(element);
    //     return errorId == errorPlaceholderIdFromElement;
    // }

    // async getErrorMessage() {
    //     return this.getText();
    // }
  
}



module.exports = VlFormValidation;
