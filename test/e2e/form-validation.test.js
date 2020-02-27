const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlFormValidationPage = require('./pages/vl-form-validation.page');
const { Key } = require('selenium-webdriver');

describe('vl-form-validation', async () => {
    const vlFormValidationPage = new VlFormValidationPage(driver);
    
    beforeEach(async () => {
        return vlFormValidationPage.load();
    });
    
    it('Als gebruiker zie ik dat alle verplichte inputvelden in het eerste en tweede formulier correct gekoppeld zijn met de corresponderende validation-message', async() => {
        var forms = [1, 2];
        for (const form of forms) {
            await verplichtInputElementIsCorrectGekoppeldAanValidationMessage(await vlFormValidationPage.getValidationMessageVoornaam(form), await vlFormValidationPage.getVoornaam(form));
            await verplichtInputElementIsCorrectGekoppeldAanValidationMessage(await vlFormValidationPage.getValidationMessageNaam(form), await vlFormValidationPage.getNaam(form));
            await verplichtInputElementIsCorrectGekoppeldAanValidationMessage(await vlFormValidationPage.getValidationMessageEmail(form), await vlFormValidationPage.getEmail(form));
            await verplichtInputElementIsCorrectGekoppeldAanValidationMessage(await vlFormValidationPage.getValidationMessageIban(form), await vlFormValidationPage.getIban(form));
            await verplichtInputElementIsCorrectGekoppeldAanValidationMessage(await vlFormValidationPage.getValidationMessageTelefoonnummer(form), await vlFormValidationPage.getTelefoonnummer(form));
            await verplichtInputElementIsCorrectGekoppeldAanValidationMessage(await vlFormValidationPage.getValidationMessageRijksregisternummer(form), await vlFormValidationPage.getRijksregisternummer(form));
        }
    });

    it('Als gebruiker zie ik geen foutmelding als een verplicht veld is ingevuld', async() => {
        const formZonderSuccessMelding = 1;
        const validationMessage = await vlFormValidationPage.getValidationMessageVoornaam(formZonderSuccessMelding);
        const inputField = await vlFormValidationPage.getVoornaam(formZonderSuccessMelding);

        await inputField.setInputValue('Joske');
        await inputField.sendKeys(Key.TAB);

        await assert.eventually.equal(validationMessage.getText(), "");
        await assert.eventually.isFalse(inputField.hasClass('vl-input-field--error'));
        await assert.eventually.isFalse(inputField.hasClass('vl-input-field--success'));
    });

    it('Als gebruiker zie ik een foutmelding als een verplicht veld niet is ingevuld', async() => {
        const form = 1;
        const validationMessage = await vlFormValidationPage.getValidationMessageNaam(form);
        const inputField = await vlFormValidationPage.getNaam(form);

        await inputField.setInputValue('');
        await inputField.sendKeys(Key.TAB);

        await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(validationMessage, inputField);
    });

    it('Als gebruiker zie ik een foutmelding als een verplicht veld niet correct is ingevuld', async() => {
        const form = 1;
        const validationMessage = await vlFormValidationPage.getValidationMessageEmail(form);
        const inputField = await vlFormValidationPage.getEmail(form);

        await inputField.setInputValue('JoskeMail.com');
        await inputField.sendKeys(Key.TAB);

        await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(validationMessage, inputField);
    });

    it('Als gebruiker zie ik foutmeldingen bij het valideren van een niet correct ingevuld formulier', async() => {
        var forms = [1, 2];
        for (const form of forms) {
            await vlFormValidationPage.validateForm(form);
            
            await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(await vlFormValidationPage.getValidationMessageVoornaam(form), await vlFormValidationPage.getVoornaam(form));
            await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(await vlFormValidationPage.getValidationMessageNaam(form), await vlFormValidationPage.getNaam(form));
            await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(await vlFormValidationPage.getValidationMessageEmail(form), await vlFormValidationPage.getEmail(form));
            await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(await vlFormValidationPage.getValidationMessageIban(form), await vlFormValidationPage.getIban(form));
            await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(await vlFormValidationPage.getValidationMessageTelefoonnummer(form), await vlFormValidationPage.getTelefoonnummer(form));
            await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(await vlFormValidationPage.getValidationMessageRijksregisternummer(form), await vlFormValidationPage.getRijksregisternummer(form));
        }
    });

    it('Als gebruiker zie ik een success melding als een veld correct is ingevuld', async() => {
        const formMetSuccessMelding = 2;
        const validationMessage = await vlFormValidationPage.getValidationMessageVoornaam(formMetSuccessMelding);
        const inputField = await vlFormValidationPage.getVoornaam(formMetSuccessMelding);

        await inputField.setInputValue('Joske');
        await inputField.sendKeys(Key.TAB);

        await assert.eventually.equal(validationMessage.getText(), "");
        await assert.eventually.isTrue(inputField.hasClass('vl-input-field--success'));
    });

    it('Als gebruiker zie ik een geen successmelding of errormelding in een formulier zonder validatie', async() => {
        const formZonderValidatie = 3;

        const inputField = await vlFormValidationPage.getNaam(formZonderValidatie);

        await assert.eventually.isFalse(inputField.hasClass('vl-input-field--success'));
        await assert.eventually.isFalse(inputField.hasClass('vl-input-field--error'));

        await vlFormValidationPage.validateForm(1);
        
        await assert.eventually.isFalse(inputField.hasClass('vl-input-field--success'));
        await assert.eventually.isFalse(inputField.hasClass('vl-input-field--error'));
    });

    it('Als gebruiker kan ik een formulier zonder successmeldingen zien', async() => {
        const form = await vlFormValidationPage.getFormZonderSuccesMelding();
        await assert.eventually.isNull(form.getAttribute('data-vl-validate-form-success'));
    });

    it('Als gebruiker kan ik een formulier met successmeldingen zien', async() => {
        const form = await vlFormValidationPage.getFormMetSuccesMelding();
        await assert.eventually.equal(form.getAttribute('data-vl-validate-form-success'), 'true');
    });

    it('Als gebruiker kan ik een formulier zonder validatie zien', async() => {
        const form = await vlFormValidationPage.getFormZonderValidatie();
        await assert.eventually.equal(form.getAttribute('novalidate'), 'true');
    });

    async function assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(validationMessage, inputElement) {
        await assert.eventually.equal(validationMessage.getText(), await inputElement.getAttribute('data-vl-error-message'));
        await assert.eventually.isTrue(inputElement.hasClass('vl-input-field--error'));
    }

    async function verplichtInputElementIsCorrectGekoppeldAanValidationMessage(validationMessage, inputElement) {
        await assert.eventually.equal(validationMessage.getAttribute('data-vl-error-id'), await inputElement.getErrorPlaceholder());
        await assert.eventually.isTrue(inputElement.hasDataRequired());
    }
});
