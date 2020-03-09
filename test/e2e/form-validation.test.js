const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlFormValidationPage = require('./pages/vl-form-validation.page');

describe('vl-form-validation', async () => {
    const vlFormValidationPage = new VlFormValidationPage(driver);

    const expectedErrorClass = "error-style";
    const expectedSuccessClass = "success-style";
    
    beforeEach(async () => {
        return vlFormValidationPage.load();
    });

    async function assertThatGeenFoutmeldingWordtGetoond(formValidationElement, validationMessageElement) {
        await assert.eventually.equal(formValidationElement.getErrorClass(), expectedErrorClass);
        await assert.eventually.equal(formValidationElement.getSuccessClass(), expectedSuccessClass);
        await assert.eventually.isFalse(formValidationElement.hasClass(expectedErrorClass));
        await assert.eventually.isFalse(formValidationElement.hasClass(expectedSuccessClass));
        await assert.eventually.isFalse(validationMessageElement.isDisplayed());
    }

    async function assertThatFoutmeldingenCorrectGetoondWorden(formValidationElement, validationMessageElement) {
        await assert.eventually.isTrue(formValidationElement.hasClass(expectedErrorClass));
        await assert.eventually.isFalse(formValidationElement.hasClass(expectedSuccessClass));
        await assert.eventually.isTrue(validationMessageElement.isDisplayed());
        await assert.eventually.equal(formValidationElement.getErrorPlaceholder(), await validationMessageElement.getErrorId());
        await assert.eventually.equal(validationMessageElement.getText(), await formValidationElement.getErrorMessage());
    }

    async function assertThatFormMetInputFieldCorrectValideert(form, geldigeInput, ongeldigeInput) {
        await assert.eventually.isTrue(form.hasAttribute('data-vl-validate-form'));

        const inputField = await form.getInputField();
        await assert.eventually.isTrue(inputField.isRequired());

        const validationMessageElement = await form.getErrorMessage();

        await assertThatGeenFoutmeldingWordtGetoond(inputField, validationMessageElement);

        await inputField.setInputValue(ongeldigeInput);
        await inputField.blur();
        
        await assertThatFoutmeldingenCorrectGetoondWorden(inputField, validationMessageElement);
        
        await inputField.setInputValue(geldigeInput);
        await inputField.blur();

        await assertThatGeenFoutmeldingWordtGetoond(inputField, validationMessageElement);
    }

    it('Als gebruiker zie ik een foutmelding als een verplicht veld niet is ingevuld in een form dat validatie doet', async() => {
        const form = await vlFormValidationPage.getFormMetVerplichtVeld();
        await assertThatFormMetInputFieldCorrectValideert(form, 'iets verschillend van niets', '');
    });

    it('Als gebruiker zie ik een foutmelding als een e-mailadres verkeerd geformatteerd is', async() => {
        const form = await vlFormValidationPage.getFormMetVerplichtEmailVeld();
        await assertThatFormMetInputFieldCorrectValideert(form, 'valid@email.be', 'invalid@email');
    });

    it('Als gebruiker zie ik een foutmelding als een iban nummer niet gelding is', async() => {
        const form = await vlFormValidationPage.getFormMetVerplichtIbanVeld();
        await assertThatFormMetInputFieldCorrectValideert(form, 'BE19 0000 0000 1212', 'BE00 0000 0000 1212');
    });

    it('Als gebruiker zie ik een foutmelding als een telefoonnr niet geldig is', async() => {
        const form = await vlFormValidationPage.getFormMetVerplichtTelefoonnummerVeld();
        await assertThatFormMetInputFieldCorrectValideert(form, '02 222 22 22', '02 123 44 3');
    });

    it('Als gebruiker zie ik een foutmelding als een datum niet geldig is', async() => {
        const form = await vlFormValidationPage.getFormMetVerplichtDatumVeld();
        await assertThatFormMetInputFieldCorrectValideert(form, '29.02.2020', '29.02.2019');
    });

    it('Als gebruiker zie ik een foutmelding als een rijksregisternummer niet geldig is', async() => {
        const form = await vlFormValidationPage.getFormMetVerplichtRRNVeld();
        await assertThatFormMetInputFieldCorrectValideert(form, '93.05.18-223.61', '93.05.18-223');
    });


    it('Als gebruiker zie ik een foutmelding als er niets is geselecteerd uit een lijst', async() => {
        const form = await vlFormValidationPage.getFormMetVerplichtSelectVeld();

        const selectField = await form.getSelectField();
        await assert.eventually.isTrue(selectField.isRequired());

        const validationMessageElement = await form.getErrorMessage();

        await assertThatGeenFoutmeldingWordtGetoond(selectField, validationMessageElement);

        await selectField.selectByIndex(1);
        await assertThatGeenFoutmeldingWordtGetoond(selectField, validationMessageElement);

        await selectField.selectByIndex(0);
        await assertThatFoutmeldingenCorrectGetoondWorden(selectField, validationMessageElement);
    });
});
