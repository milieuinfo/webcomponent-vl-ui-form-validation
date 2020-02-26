
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlFormValidationPage = require('./pages/vl-form-validation.page');
const { Key } = require('selenium-webdriver');

describe('vl-form-validation', async () => {
    const vlFormValidationPage = new VlFormValidationPage(driver);
    
    beforeEach((done) => {
        vlFormValidationPage.load().then(() => {
            done();
        });
    });
    
    it('Als gebruiker zie ik dat alle inputvelden in het eerste formulier correct gekoppeld zijn met de corresponderende validation-message', async() => {
        const verplichteVoornaamValidationMessage = await vlFormValidationPage.getValidationMessageVerplichteVoornaam();
        const voornaamInputField = await vlFormValidationPage.getVerplichteVoornaam();
        await assert.eventually.isTrue(verplichteVoornaamValidationMessage.toontFoutmeldingenVoorElement(voornaamInputField));

        const verplichteNaamValidationMesage = await vlFormValidationPage.getValidationMessageVerplichteNaam();
        const naamInputField = await vlFormValidationPage.getVerplichteNaam();
        await assert.eventually.isTrue(verplichteNaamValidationMesage.toontFoutmeldingenVoorElement(naamInputField));

        const verplichteEmailValidationMessage = await vlFormValidationPage.getValidationMessageVerplichteEmail();
        const emailInputField = await vlFormValidationPage.getVerplichteEmail();
        await assert.eventually.isTrue(verplichteEmailValidationMessage.toontFoutmeldingenVoorElement(emailInputField));

        const verplichteIbanValiationMessage = await vlFormValidationPage.getValidationMessageVerplichteIban();
        const ibanInputField = await vlFormValidationPage.getVerplichteIban();
        await assert.eventually.isTrue(verplichteIbanValiationMessage.toontFoutmeldingenVoorElement(ibanInputField));

        const verplichtTelefoonnrValidationMessage = await vlFormValidationPage.getValidationMessageVerplichtTelefoonnummer();
        const telefoonnrInputField = await vlFormValidationPage.getVerplichtTelefoonnummer();
        await assert.eventually.isTrue(verplichtTelefoonnrValidationMessage.toontFoutmeldingenVoorElement(telefoonnrInputField));

        const verplichtRRNValidationMessage = await vlFormValidationPage.getValidationMessageRijksregisternummer();
        const rrnInputField = await vlFormValidationPage.getVerplichtRijksregisternummer();
        await assert.eventually.isTrue(verplichtRRNValidationMessage.toontFoutmeldingenVoorElement(rrnInputField));
    });

    it('Als gebruiker zie ik geen foutmelding als een verplicht veld is ingevuld', async() => {
        const validationMessage = await vlFormValidationPage.getValidationMessageVerplichteVoornaam();
        const inputField = await vlFormValidationPage.getVerplichteVoornaam();

        await inputField.setInputValue('Joske');
        await inputField.sendKeys(Key.TAB);

        await assert.eventually.equal(validationMessage.getErrorMessage(), "");
        await assert.eventually.isFalse(inputField.hasClass('vl-input-field--error'));
    });

    it('Als gebruiker zie ik een foutmelding als een verplicht veld niet is ingevuld', async() => {
        const validationMessage = await vlFormValidationPage.getValidationMessageVerplichteNaam();
        const inputField = await vlFormValidationPage.getVerplichteNaam();

        await inputField.setInputValue('');
        await inputField.sendKeys(Key.TAB);

        await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(validationMessage, inputField);
    });

    it('Als gebruiker zie ik een foutmelding als een verplicht veld niet correct is ingevuld', async() => {
        const validationMessage = await vlFormValidationPage.getValidationMessageVerplichteEmail();
        const inputField = await vlFormValidationPage.getVerplichteEmail();

        await inputField.setInputValue('JoskeMail.com');
        await inputField.sendKeys(Key.TAB);

        await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(validationMessage, inputField);
    });


    

    it('Als gebruiker zie ik foutmeldingen bij het valideren van een niet correct ingevuld formulier', async() => {
        await vlFormValidationPage.validateFirstForm();

        await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(await vlFormValidationPage.getValidationMessageVerplichteVoornaam(), await vlFormValidationPage.getVerplichteVoornaam());
        await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(await vlFormValidationPage.getValidationMessageVerplichteNaam(), await vlFormValidationPage.getVerplichteNaam());
        await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(await vlFormValidationPage.getValidationMessageVerplichteEmail(), await vlFormValidationPage.getVerplichteEmail());
        await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(await vlFormValidationPage.getValidationMessageVerplichteIban(), await vlFormValidationPage.getVerplichteIban());
        await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(await vlFormValidationPage.getValidationMessageVerplichtTelefoonnummer(), await vlFormValidationPage.getVerplichtTelefoonnummer());
        await assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(await vlFormValidationPage.getValidationMessageRijksregisternummer(), await vlFormValidationPage.getVerplichtRijksregisternummer());
    });

    async function assertFoutmeldingVoorFoutiefInputElementWordtCorrectGetoond(validationMessage, inputElement) {
        await assert.eventually.equal(validationMessage.getErrorMessage(), await inputElement.getAttribute('data-vl-error-message'));
        await assert.eventually.isTrue(inputElement.hasClass('vl-input-field--error'));
    }

    after(async () => {
        return driver.quit();
    });
});
