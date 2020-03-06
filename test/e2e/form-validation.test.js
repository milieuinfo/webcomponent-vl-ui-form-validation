const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlFormValidationPage = require('./pages/vl-form-validation.page');
// const { Key, By } = require('selenium-webdriver');

describe('vl-form-validation', async () => {
    const vlFormValidationPage = new VlFormValidationPage(driver);

    const errorClassIsPresent = true;
    const successClassIsPresent = true;
    
    beforeEach(async () => {
        return vlFormValidationPage.load();
    });

    // it('Als een gebruiker een veld correct invult, ziet hij geen foutmelding', async() => {
    //     let form = await vlFormValidationPage.getFormMetVerplichtVeld();

    //     const inputField = await form.getInputField();

    //     await assert.eventually.isTrue(inputField.isRequired());
    //     await assertFormValidationElementHasErrorClassOrSuccessClass(inputField, !errorClassIsPresent, !successClassIsPresent);

    //     await inputField.setInputValue('omdat het moet');
    //     await form.valideer();

    //     form = await vlFormValidationPage.getFormMetVerplichtVeld();
    //     await assertFormValidationElementHasErrorClassOrSuccessClass(inputField, !errorClassIsPresent, !successClassIsPresent);
    // });
    
    it('Als gebruiker zie ik een foutmelding als een verplicht veld niet is ingevuld in een form dat validatie doet', async() => {
        const form = await vlFormValidationPage.getFormMetVerplichtVeld();
        await assertThatFormMetOngeldigeInputCorrectGevalideerdWordt(form, '');
    });

    it('Als gebruiker zie ik een foutmelding als een e-mailadres verkeerd geformatteerd is', async() => {
        const form = await vlFormValidationPage.getFormMetVerplichtEmailVeld();
        await assertThatFormMetOngeldigeInputCorrectGevalideerdWordt(form, 'invalid@company');
    });

    it('Als gebruiker zie ik een foutmelding als een iban nummer niet gelding is', async() => {
        const form = await vlFormValidationPage.getFormMetVerplichtIbanVeld();
        await assertThatFormMetOngeldigeInputCorrectGevalideerdWordt(form, 'BE12000000000000');
    });

    it('Als gebruiker zie ik een foutmelding als een telefoonnr niet geldig is', async() => {
        const form = await vlFormValidationPage.getFormMetVerplichtTelefoonnummerVeld();
        await assertThatFormMetOngeldigeInputCorrectGevalideerdWordt(form, '02 123 44 3');
    });

    it('Als gebruiker zie ik een foutmelding als een datum niet geldig is', async() => {
        const form = await vlFormValidationPage.getFormMetVerplichtDatumVeld();
        await assertThatFormMetOngeldigeInputCorrectGevalideerdWordt(form, '29.02.2019');
    });

    it('Als gebruiker zie ik een foutmelding als een rijksregisternummer niet geldig is', async() => {
        const form = await vlFormValidationPage.getFormMetVerplichtRRNVeld();
        await assertThatFormMetOngeldigeInputCorrectGevalideerdWordt(form, '123');
    });


    it('Als gebruiker zie ik een foutmelding als er niets is geselecteerd uit een lijst', async() => {
        const form = await vlFormValidationPage.getFormMetVerplichtSelectVeld();

        const selectField = await form.getSelectField();
        await assert.eventually.isTrue(selectField.isRequired());
        await assertFormValidationElementHasErrorClassOrSuccessClass(selectField, false, false);

        let selectedOption = await selectField.getAttribute('value');
        
        await form.valideer();

        selectedOption = await selectField.getAttribute('value');

        assert.equal(selectedOption, '');

        await assertFormValidationElementHasErrorClassOrSuccessClass(selectField, true, false);
    });

    async function assertThatFormMetOngeldigeInputCorrectGevalideerdWordt(form, ongeldigeInput) {
        await assert.eventually.isTrue(form.hasAttribute('data-vl-validate-form'));

        let inputField = await form.getInputField();
        await assert.eventually.isTrue(inputField.isRequired());
        await assertFormValidationElementHasErrorClassOrSuccessClass(inputField, false, false);
        
        const validationMessageElement = await form.getErrorMessage();
        await assert.eventually.isFalse(validationMessageElement.isDisplayed());

        await inputField.setInputValue(ongeldigeInput);
        await form.valideer();

        await assertFormValidationElementHasErrorClassOrSuccessClass(inputField, true, false);
        await assertThatFoutmeldingCorrectGetoondWordt(validationMessageElement, inputField);
    }

    async function assertFormValidationElementHasErrorClassOrSuccessClass(formValidationElement, errorClassIsSet, successClassIsSet) {
        const expectedErrorClass = "error-style";
        const expectedSuccessClass = "success-style";
        await assert.eventually.equal(formValidationElement.getErrorClass(), expectedErrorClass);
        await assert.eventually.equal(formValidationElement.getSuccessClass(), expectedSuccessClass);

        await assert.eventually.equal(formValidationElement.hasClass(expectedErrorClass), errorClassIsSet);
        await assert.eventually.equal(formValidationElement.hasClass(expectedSuccessClass), successClassIsSet);
    }

    async function assertThatFoutmeldingCorrectGetoondWordt(validationMessageElement, formValidationElement) {
        debugger
        await assert.eventually.isTrue(validationMessageElement.isDisplayed());
        await assert.eventually.equal(formValidationElement.getErrorPlaceholder(), await validationMessageElement.getErrorId());
        await assert.eventually.equal(validationMessageElement.getText(), await formValidationElement.getErrorMessage());
    }
    
    /*
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

    */
});
