const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlFormValidationPage = require('./pages/vl-form-validation.page');

describe('vl-form-validation', async () => {
   const vlFormValidationPage = new VlFormValidationPage(driver);

   before(() => {
       return vlFormValidationPage.load();
   });

    it("Dummy test om de browsers te sluiten", () => {
    	assert.isTrue(true);
    });
});
