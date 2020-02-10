const { assert, driver } = require('vl-ui-core').Test;
const VlFormMessage = require('./pages/vl-form-message.page');

describe('vl-form-message', async () => {
    const vlFormMessage = new VlFormMessage(driver);

    before(() => {
        return vlFormMessage.load();
    });

    after(() => driver && driver.quit());
});
