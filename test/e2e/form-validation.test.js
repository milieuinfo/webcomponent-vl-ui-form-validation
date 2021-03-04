const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlFormValidationPage = require('./pages/vl-form-validation.page');

describe('vl-form-validation', async () => {
  let vlFormValidationPage;

  beforeEach(async () => {
    vlFormValidationPage = new VlFormValidationPage(getDriver());
    return vlFormValidationPage.load();
  });

  it('als gebruiker zie ik een foutmelding als een verplicht veld niet is ingevuld in een form dat validatie doet', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const input = await form.getInputField('voornaam');
    await assert.eventually.isTrue(input.isRequired());
    await assert.eventually.isFalse(input.hasError());

    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('Tom');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding als een e-mailadres verkeerd geformatteerd is', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const input = await form.getInputField('email');

    await input.setValue('invalid@email');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('valid@email.be');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding als een iban nummer niet gelding is', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const input = await form.getInputField('iban');

    await input.setValue('BE00 0000 0000 1212');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('BE19 0000 0000 1212');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding als een telefoonnr niet geldig is', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const input = await form.getInputField('telefoon');

    await input.setValue('02 123 44 3');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('02 222 22 22');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding als een rijksregisternummer niet geldig is', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const input = await form.getInputField('rrn');

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

  it('als gebruiker zie ik een foutmelding als een uuid niet geldig is', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const input = await form.getInputField('uuid');

    const invalidUuid = ['abc', '1c6fa548-5eef-11ez-ae93-0242ac130002', '1c6fa548-5eef-11ez-ae93-0242ac130002a', '1c6fa5485eef11ezae930242ac130002a'];
    for (let uuid of invalidUuid) {
      await input.setValue(uuid);
      await form.submit();
      await assert.eventually.isTrue(input.hasError());
    }

    const validUuid = ['1c6fa548-5eef-11ea-ae93-0242ac130002', '12345678-abcd-1234-ef00-0123456789ef'];
    for (let uuid of validUuid) {
      await input.setValue(uuid);
      await form.submit();
      await assert.eventually.isFalse(input.hasError());
    }
  });

  it('als gebruiker zie ik een foutmelding als een datum niet geldig is', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const input = await form.getInputField('datum');

    await input.setValue('29.02.2019');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('29.02.2020');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding als er niets is geselecteerd uit een lijst', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const select = await form.getSelect('stad');

    await form.submit();
    await assert.eventually.isTrue(select.hasError());

    await select.selectByIndex(1);
    await form.submit();
    await assert.eventually.isFalse(select.hasError());
  });

  it('als gebruiker zie ik een foutmelding als er geen datum is geselecteerd', async () => {
    const form = await vlFormValidationPage.getForm(1);
    const datepicker = await form.getDatepicker('datum');

    await form.submit();
    await assert.eventually.isTrue(datepicker.hasError());

    await datepicker.selectDay(15);
    await form.submit();
    await assert.eventually.isFalse(datepicker.hasError());
  });
});
