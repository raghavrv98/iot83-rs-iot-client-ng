import { And, Then } from 'cypress-cucumber-preprocessor/steps';
let title: string;


And('I should see first attribute of filter menu in {string}', viewport => {
  if (viewport === 'mobile') {
    cy.get('ul[id=\'filterMenu\']')
      .find('li')
      .first()
      .then((value) => {
        title = value[0].id;
      });
  } else {
    cy.findByTestId('filterMenu').find('button')
      .first()
      .then((value) => {
        title = value[0].id;
      });
  }
});

Then('I click on first attribute of filter menu', () => {
  cy.get(`[id=${title}]`).click();
});

Then('I click on first option from list of first attribute in {string}', viewport => {
  if ((viewport === 'mobile')) {
    cy.get('ul[id=\'filterMenu\']').next().find('input[type="checkbox"]').click();
  }
  else {
    cy.findByTestId('filterMenu').find('input[name="checkbox"]').first().click();
  }
});

And('I should see selected option on attribute tag', () => {
  cy.get('.check-box-text')
    .first()
    .invoke('text')
    .then((text) => {
      text = `${title.split('_')[0]
        }: ${text}`;
      cy.get(`button[id=${title}]`)
        .invoke('text')
        .should('be.eq', text);
    });
});

And('I should not see selected option on attribute tag', () => {
  cy.get('.check-box-text')
    .first()
    .invoke('text')
    .then((text) => {
      text = `${title.split('_')[0]}: ${text}`;
      cy.get(`button[id=${title}]`)
        .invoke('text')
        .should('not.be.eq', text);
    });
});

And('I should see {string} text on dropdown', value => {
  cy.get(`button[id=${title}0]`)
    .invoke('text')
    .should('be.eq', value);
});

Then('I should see device cards according to the filter', () => {
  cy.get('[id="totalRecordsCount"]')
    .invoke('text')
    .then((totalCount) => {
      cy.findByTestId('deviceCards')
        .children()
        .its('length')
        .should('be.eq', +totalCount);
    });
});

And('I click on {string} icon in {string}', (text,viewport) => {
  const className = viewport === 'mobile'? '.filter-wrapper-responsive' : '.filter-wrapper';
   cy.get(className).should('exist').then(() =>{
       cy.findByTestId(text).should('exist').click();
   });
}
);

And('I enter label {string}', label =>
  cy.get('input[name="saveBookmark"]').type(`${label}`));

And('I click on {string} box', id =>
  cy.get(`[id=${id}]`).click());

And('I click on {string} text', id =>
  cy.findByTestId(id).click());

And('I click on {string} delete button', id =>
  cy.get(`button[id=${id}]`).click());

And('I should see {string} box is disabled', id =>
  cy.get(`input[id='${id}']`).should('be.disabled'));

And('I should see {string} in bookmark list', text =>
  cy.get('.dropdown-menu').should('contain.text', text));
