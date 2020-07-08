const {assert, driver} = require('vl-ui-core').Test.Setup;
const VlFormValidationPage = require('./pages/vl-form-validation.page');

describe('vl-form-validation', async () => {
  const vlFormValidationPage = new VlFormValidationPage(driver);

  beforeEach(async () => {
    return vlFormValidationPage.load();
  });

  it('Als gebruiker zie ik een foutmelding als een verplicht veld niet is ingevuld in een form dat validatie doet', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const input = await form.getInputField(1);
    await assert.eventually.isTrue(input.isRequired());
    await assert.eventually.isFalse(input.hasError());

    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('Tom');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('Als gebruiker zie ik een foutmelding als een e-mailadres verkeerd geformatteerd is', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const input = await form.getInputField(3);

    await input.setValue('invalid@email');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('valid@email.be');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('Als gebruiker zie ik een foutmelding als een iban nummer niet gelding is', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const input = await form.getInputField(4);

    await input.setValue('BE00 0000 0000 1212');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('BE19 0000 0000 1212');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('Als gebruiker zie ik een foutmelding als een telefoonnr niet geldig is', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const input = await form.getInputField(5);

    await input.setValue('02 123 44 3');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('02 222 22 22');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('Als gebruiker zie ik een foutmelding als een rijksregisternummer niet geldig is', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const input = await form.getInputField(6);

    const invalidRRN = ['93.05.18-223', '88.12.03-001.96', '00.20.01-053.56', '33.00.00-084.26', '00.00.00-001.27', '44.00.00-281.60'];
    for (rrn of invalidRRN) {
      await input.setValue(rrn);
      await form.submit();
      await assert.eventually.isTrue(input.hasError());
    }

    const validRRN = ['93.05.18-223.61', '88.12.03-001.95', '00.20.01-053.57', '33.00.00-084.27', '00.00.00-001.28', '44.00.00-281.61'];
    for (rrn of validRRN) {
      await input.setValue(rrn);
      await form.submit();
      await assert.eventually.isFalse(input.hasError());
    }
  });

  it('Als gebruiker zie ik een foutmelding als een datum niet geldig is', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const input = await form.getInputField(7);

    await input.setValue('29.02.2019');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('29.02.2020');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('Als gebruiker zie ik een foutmelding als er niets is geselecteerd uit een lijst', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const select = await form.getSelect(1);

    await form.submit();
    await assert.eventually.isTrue(select.hasError());

    await select.selectByIndex(1);
    await form.submit();
    await assert.eventually.isFalse(select.hasError());
  });
});
