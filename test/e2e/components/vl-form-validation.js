const vlFormValidation = {
  async isRequired() {
    return this.hasAttribute('data-required');
  },

  async getErrorMessage() {
    return this.getAttribute('data-vl-error-message');
  },

  async getErrorPlaceholder() {
    return this.getAttribute('data-vl-error-placeholder');
  },

  async getErrorClass() {
    return this.getAttribute('data-vl-error-class');
  },

  async getSuccessClass() {
    return this.getAttribute('data-vl-success-class');
  },

  async isNumericalityOnlyInteger() {
    return this.hasAttribute('data-vl-numericality-only-integer');
  },

  async getNumericalityGreaterThan() {
    return this.getAttribute('data-vl-numericality-greater-than');
  },

  async getNumericalityGreaterThanOrEqualTo() {
    return this.getAttribute('data-vl-numericality-greater-than-or-equal-to');
  },

  async getNumericalityLessThan() {
    return this.getAttribute('data-vl-numericality-less-than');
  },

  async getNumericalityLessThanOrEqualTo() {
    return this.getAttribute('data-vl-numericality-less-than-or-equal-to');
  },

  async hasError() {
    const errorClass = await this.getErrorClass();
    return this.hasClass(errorClass);
  },

  async hasSuccess() {
    const successClass = await this.getSuccessClass();
    return this.hasClass(successClass);
  },
};

module.exports = vlFormValidation;
