import { And, Then } from 'cypress-cucumber-preprocessor/steps';

Then('I should see device cards', () =>
    cy.findByTestId('deviceCards').should('exist')
);

And('I should see list of values in records per page dropdown', () => {
    cy.get('[class="dropdown-menu show"]')
        .find('li')
        .each(($el) =>
            cy.get('[class="dropdown-menu show"]').should('contain', $el.text())
        );
});

And('I should see default value of {string} is {int}', (text, defaultValue) =>
    cy.get(`button[id="${text}"]`).should('have.text', defaultValue)
);

And('I should see {string} count not greater than {int}', (text, value) =>
    cy.findByTestId(text).children().its('length').should('be.lte', value)
);

And('I click on {int} from the given options in records per page dropdown', (num) =>
    cy.get('[class="dropdown-menu show"]').contains(`${num}`).click()
);

And('I should see {int} as a value in input box of current page', (value) =>
    cy.findByRole('spinbutton').invoke('val').should('be.eq', `${value}`)
);

And('I should see {string} button is disabled', (pages) =>
    cy.get(`button[id=${pages}]`).should('be.disabled')
);
