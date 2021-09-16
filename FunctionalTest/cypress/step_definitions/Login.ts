import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('I should see first line of branding text {string}', (text: string) => {
  cy.contains(`${text}`, { matchCase: false }).should('exist');
});

And('I should see second line of branding text {string}', (text: string) => {
  cy.contains(`${text}`).should('exist');
});

When('I click on button with name {string}', (name: string) =>
  cy.get('button').contains(name).click()
);
