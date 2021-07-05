const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlFormValidationPage = require('./pages/vl-form-validation.page');

describe('vl-form-validation', async () => {
  let vlFormValidationPage;

  beforeEach(() => {
    vlFormValidationPage = new VlFormValidationPage(getDriver());
    return vlFormValidationPage.load();
  });

  it('als gebruiker zie ik een foutmelding als een verplicht veld niet is ingevuld in een form dat validatie doet', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageAttributes();
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
    const form = await vlFormValidationPage.getFormWithErrorMessageAttributes();
    const input = await form.getInputField('email');

    await input.setValue('invalid@email');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('valid@email.be');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding als een iban nummer niet gelding is', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageAttributes();
    const input = await form.getInputField('iban');

    await input.setValue('BE00 0000 0000 1212');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('BE19 0000 0000 1212');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding als een telefoonnr niet geldig is', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageAttributes();
    const input = await form.getInputField('telefoon');

    await input.setValue('02 123 44 3');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('02 222 22 22');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding als een rijksregisternummer niet geldig is', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageAttributes();
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
    const form = await vlFormValidationPage.getFormWithErrorMessageAttributes();
    const input = await form.getInputField('uuid');

    const invalidUuids = ['abc', '1c6fa548-5eef-11ez-ae93-0242ac130002', '1c6fa548-5eef-11ez-ae93-0242ac130002a', '1c6fa5485eef11ezae930242ac130002a'];
    for (const uuid of invalidUuids) {
      await input.setValue(uuid);
      await form.submit();
      await assert.eventually.isTrue(input.hasError());
    }

    const validUuids = ['1c6fa548-5eef-11ea-ae93-0242ac130002', '12345678-ABCD-1234-ef00-0123456789ef'];
    for (const uuid of validUuids) {
      await input.setValue(uuid);
      await form.submit();
      await assert.eventually.isFalse(input.hasError());
    }
  });

  it('als gebruiker zie ik een foutmelding als een datum niet geldig is', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageAttributes();
    const input = await form.getInputField('datum');

    await input.setValue('29.02.2019');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('29.02.2020');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding als er niets is geselecteerd uit een lijst', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageAttributes();
    const select = await form.getSelect('stad');

    await select.selectByIndex(1);
    await form.submit();
    await assert.eventually.isFalse(select.hasError());

    await select.selectByIndex(0);
    await form.submit();
    await assert.eventually.isTrue(select.hasError());
  });

  it('als gebruiker zie ik een foutmelding als er geen datum is geselecteerd', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageAttributes();
    const datepicker = await form.getDatepicker('datum');

    await form.submit();
    await assert.eventually.isTrue(datepicker.hasError());

    await datepicker.selectDay(15);
    await form.submit();
    await assert.eventually.isFalse(datepicker.hasError());
  });

  it('als gebruiker zie ik een foutmelding als er geen geheel getal is ingevuld', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageAttributes(1);
    const input = await form.getInputField('integer');
    await assert.eventually.isTrue(input.isNumericalOnlyInteger());

    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('foobar');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('4');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());

    await input.setValue('4,5');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding als het gehele getal niet tussen het ingestelde bereik ligt', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageAttributes(1);
    const input = await form.getInputField('integer');
    await assert.eventually.equal(input.getNumericalGreaterThanOrEqualTo(), '2');
    await assert.eventually.equal(input.getNumericalLessThanOrEqualTo(), '1000');
    await assert.eventually.isNull(input.getNumericalLessThan());
    await assert.eventually.isNull(input.getNumericalGreaterThan());

    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('2');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());

    await input.setValue('1');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('1 000');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());

    await input.setValue('1 001');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('200');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());

    await input.setValue('2 0 00');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('1 0 0');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding als er geen (komma)getal is ingevuld', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageAttributes(1);
    const input = await form.getInputField('decimal');
    await assert.eventually.isFalse(input.isNumericalOnlyInteger());

    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('foobar');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('4,6');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding als het kommagetal niet tussen het ingestelde bereik ligt', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageAttributes(1);
    const input = await form.getInputField('decimal');
    await assert.eventually.equal(input.getNumericalGreaterThan(), '2.5');
    await assert.eventually.equal(input.getNumericalLessThan(), '15.4');
    await assert.eventually.isNull(input.getNumericalGreaterThanOrEqualTo());
    await assert.eventually.isNull(input.getNumericalLessThanOrEqualTo());

    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('2,5001');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());

    await input.setValue('2,5');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('15,3999');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());

    await input.setValue('15,4');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('10,64');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding die gedefinieerd is in de error-placeholder als een verplicht veld niet is ingevuld', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageElements();

    const input = await form.getInputField('voornaam-err-via-placeholder');
    await assert.eventually.isTrue(input.isRequired());
    await assert.eventually.isFalse(input.hasError());

    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('Tom');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding, die gedefinieerd is in de error-placeholder, als een e-mailadres verkeerd geformatteerd is', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageElements();
    const input = await form.getInputField('email-err-via-placeholder');

    await input.setValue('invalid@email');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('valid@email.be');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding, die gedefinieerd is in de error-placeholder, als een iban nummer niet gelding is', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageElements();
    const input = await form.getInputField('iban-err-via-placeholder');

    await input.setValue('BE00 0000 0000 1212');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('BE19 0000 0000 1212');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding, die gedefinieerd is in de error-placeholder, als een telefoonnr niet geldig is', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageElements();
    const input = await form.getInputField('telefoon-err-via-placeholder');

    await input.setValue('02 123 44 3');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('02 222 22 22');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding, die gedefinieerd is in de error-placeholder, als een rijksregisternummer niet geldig is', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageElements();
    const input = await form.getInputField('rrn-err-via-placeholder');

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

  it('als gebruiker zie ik een foutmelding, die gedefinieerd is in de error-placeholder, als een datum niet geldig is', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageElements();
    const input = await form.getInputField('datum-err-via-placeholder');

    await input.setValue('29.02.2019');
    await form.submit();
    await assert.eventually.isTrue(input.hasError());

    await input.setValue('29.02.2020');
    await form.submit();
    await assert.eventually.isFalse(input.hasError());
  });

  it('als gebruiker zie ik een foutmelding, die gedefinieerd is in de error-placeholder, als een uuid niet geldig is', async () => {
    const form = await vlFormValidationPage.getFormWithErrorMessageElements();
    const input = await form.getInputField('uuid-err-via-placeholder');

    const invalidUuids = ['abc', '1c6fa548-5eef-11ez-ae93-0242ac130002', '1c6fa548-5eef-11ez-ae93-0242ac130002a', '1c6fa5485eef11ezae930242ac130002a'];
    for (const uuid of invalidUuids) {
      await input.setValue(uuid);
      await form.submit();
      await assert.eventually.isTrue(input.hasError());
    }

    const validUuids = ['1c6fa548-5eef-11ea-ae93-0242ac130002', '12345678-ABCD-1234-ef00-0123456789ef'];
    for (const uuid of validUuids) {
      await input.setValue(uuid);
      await form.submit();
      await assert.eventually.isFalse(input.hasError());
    }
  });
});
