const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlFormValidationPage = require('./pages/vl-form-validation.page');

describe('vl-form-validation', async () => {
    const vlFormValidationPage = new VlFormValidationPage(driver);

    beforeEach(async () => {
        return vlFormValidationPage.load();
    });

    async function assertThatGeenFoutmeldingWordtGetoondBijGeldigeInput(formValidationElement, validationMessageElement, setGeldigeInputFunctie) {
        if (setGeldigeInputFunctie) {
            await setGeldigeInputFunctie();
        }
        await assert.eventually.isFalse(formValidationElement.hasError());
        await assert.eventually.isFalse(formValidationElement.isSuccess());
        await assert.eventually.isFalse(validationMessageElement.isDisplayed());
    }

    async function assertThatFoutmeldingenCorrectGetoondWordenBijOngeldigeInput(formValidationElement, validationMessageElement, setOngeldigeInputFunctie) {
        if (setOngeldigeInputFunctie) {
            await setOngeldigeInputFunctie();
        }
        await assert.eventually.isTrue(formValidationElement.hasError());
        await assert.eventually.isFalse(formValidationElement.isSuccess());
        await assert.eventually.isTrue(validationMessageElement.isDisplayed());
        await assert.eventually.equal(formValidationElement.getErrorPlaceholder(), await validationMessageElement.getErrorId());
        await assert.eventually.equal(validationMessageElement.getText(), await formValidationElement.getErrorMessage());
    }


    async function assertThatFormMetInputFieldCorrectValideert(form, geldigeInput, ongeldigeInput) {
        const inputField = await form.getInputField();
        await assert.eventually.isTrue(inputField.isRequired());

        const setInputValue = function(text) {
            return async function() {
                await inputField.setInputValue(text);
                await inputField.blur();
            }
        };

        await assertThatFormValidationCorrectValideert(inputField, await form.getErrorMessage(), setInputValue(geldigeInput), setInputValue(ongeldigeInput));
    }

    async function assertThatFormMetSelectFieldCorrectValideert(form, geldigeInput, ongeldigeInput) {
        const selectField = await form.getSelectField();
        await assert.eventually.isTrue(selectField.isRequired());
       
        const selectByIndex = function(index) {
            return async function() {
                await selectField.selectByIndex(index);
            }
        }
        await assertThatFormValidationCorrectValideert(selectField, await form.getErrorMessage(), selectByIndex(geldigeInput), selectByIndex(ongeldigeInput));
    }

    async function assertThatFormValidationCorrectValideert(formValidationElement, validationMessageElement, setGeldigeInput, setOngeldigeInput) {
        await assertThatGeenFoutmeldingWordtGetoondBijGeldigeInput(formValidationElement, validationMessageElement, setGeldigeInput);
        await assertThatFoutmeldingenCorrectGetoondWordenBijOngeldigeInput(formValidationElement, validationMessageElement, setOngeldigeInput);
        await assertThatGeenFoutmeldingWordtGetoondBijGeldigeInput(formValidationElement, validationMessageElement, setGeldigeInput);
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
        await assertThatFormMetInputFieldCorrectValideert(form, '88.12.03-001.95', '88.12.03-001.96');
    });

    it('Als gebruiker zie ik een foutmelding als er niets is geselecteerd uit een lijst', async() => {
        const form = await vlFormValidationPage.getFormMetVerplichtSelectVeld();
        await assertThatFormMetSelectFieldCorrectValideert(form, 1, 0);
    });
});
