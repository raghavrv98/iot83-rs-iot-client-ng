import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
let addFilterValue: string;

const getNameAndIconConfig = (name: string, iconName: string) => {
    cy.get(`[id='/${name.toLowerCase()}']`).should('exist')
        .and('contain.text', name)
        .within(() => {
            cy.get(`.fa-${iconName}`).should('exist');
        });
};

const getClassIcon = (name: string, iconName: string) => {
    cy.get(`[id='${name.toLowerCase()}']`).should('exist')
        .within(() => {
            cy.get(`.fa-${iconName}`).should('exist');
        });
};

const getFilterMenu = (name: string) => {
    switch (name) {
        case 'filterMenu':
            return '.filter-menu';
        case 'filterBy':
            return '.mobile-view-filter';
        case 'hamburger':
            return '.collapse.show';
        default:
            return '';
    }
};

const getIconName = (name: string) => {
    switch (name.toLowerCase()) {
        case 'home':
            return 'home';
        case 'devices':
            return 'server';
        case 'alarms':
            return 'bell';
        case 'trends':
            return 'file-invoice';
        case 'reports':
            return 'chart-line';
        case 'filter':
            return 'filter';
        case 'export':
            return 'external-link';
        case 'bookmark':
            return 'star';
        case 'search':
            return 'search';
        default:
            return '';
    }
};

Given('I am on the {string} page', page =>
    cy.visit(`/${page}`));

Then('I should navigate to {string} page', page =>
    cy.url().should('include', `/${page}`));

When('I am on {string} view', viewport => {
    if (viewport === 'mobile') {
        cy.viewport(360, 640);
    }
});

Then('I should see {string} button', (id) =>
    cy.get(`button[id='${id}']`).should('exist'));

Then('I should see {string} heading', heading =>
    cy.findByRole('heading', { name: `${heading}` }).should('exist'));

Then('I should see navigation link with name {string} and matching icon', (name) => {
    const iconName = getIconName(name);
    getNameAndIconConfig(name, iconName);
});

Then('I should see {string} button and matching icon', (name) => {
    const iconName = getIconName(name);
    getClassIcon(name, iconName);
});

When('I click on {string} navigation link', item =>
    cy.get(`[id="/${item.toLowerCase()}"]`).click());

And('I should see {string} text on navigation link', navigationLink =>
    cy.findByText(navigationLink).should('exist'));

And('I should see {string} image', image =>
    cy.findByRole('img', { name: `${image}` }).should('exist'));

And('I click on {string} button', id => {
    cy.get(`button[id=${id}]`).should('exist').within(($el)=> {
        $el.click();
    })
;});

Then('I should see welcome message {string}', message =>
    cy.contains(`${message}`).should('exist'));

And('I should see {string} text on button', text =>
    cy.get(`button[id=${text}]`).should('have.text', text));

And('I should not see {string} text on button', text =>
    cy.get(`button[id=${text}]`).should('not.contain', text));

And('I should see {string} menu', name => {
    const classFilter= getFilterMenu(name);
    cy.get(`${classFilter}`)
        .should('be.visible');
});

And('I should not see {string} menu', name => {
    const classFilter = getFilterMenu(name);
    cy.get(`${classFilter}`).should('not.exist');
});

And('I should see {string} pop-up', id =>
    cy.get(`div[id=${id}]`));

And('I should not see initials pop-up', () =>
    cy.get('.dropdown-menu show').should('not.exist'));


And('I click on {string} checkbox', value =>
    cy.findByRole('checkbox', { name: `${value}` }).click());

When('I click on last element of filter checkbox', () => {
    cy.get('input[name=\'showFilter\']')
        .last()
        .then((addFilter) => {
            addFilterValue = addFilter[0].id;
        })
        .next('.checkMark')
        .click({ force: true });
});

And('I should scroll down', () =>
    cy.get('.fx-b35').scrollTo('bottom'));

And('I should not see button name {string}', name =>
    cy.get(`[id='${name}']`).should('not.contain', name));

And('I should see last element\'s value in filter menu list in {string}', viewport => {
    if (viewport === 'mobile') {
        cy.get(`li[id='${addFilterValue}']`).should('exist');
    }
    else {
        cy.findByRole('button', { name: `${addFilterValue}` }).should('exist');
    }
});

And('I should not see last element\'s value in filter menu list in {string}', viewport => {
    if (viewport === 'mobile') {
        cy.get(`li[id='${addFilterValue}']`).should('not.exist');
    }
    else {
        cy.findByRole('button', { name: `${addFilterValue}` }).should('not.exist');
    }
});

And('I should see {string} box with matching icon', text => {
    const iconName = getIconName(text);
    cy.get(`[id='${text}']`).should('exist');
    cy.get(`.fa-${iconName}`).should('exist');
});

And('I click on {string} dropdown', text =>
    cy.findByRole('button', { name: `${text}` }).click());

And('I should see input box for current page', () =>
    cy.findByRole('spinbutton').should('exist'));

And('I should see {string} count', name =>
    cy.get(`[id=${name}]`).should('exist'));

And('I click on hamburger menu', () => {
    cy.findByTestId('hamburgerBtn').should('exist').within(($el)=> {
        $el.click();
    });
});

And('I scroll to bottom', () =>
    cy.get('[id=\'addRemoveFilterModal\']').scrollTo('bottom'));
