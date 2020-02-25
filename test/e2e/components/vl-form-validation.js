const { VlElement } = require('vl-ui-core').Test;

class VlFormValidation extends VlElement {  

    async isDataRequired() {
        return this.hasAttribute('data-required');
    }

  
}

module.exports = VlFormValidation;
