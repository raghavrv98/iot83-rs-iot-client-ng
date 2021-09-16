import { Then} from 'cypress-cucumber-preprocessor/steps';

Then('I should see quick summary chart', () =>
    cy.get('div[id=\'chartDiv\']').should('exist'));
