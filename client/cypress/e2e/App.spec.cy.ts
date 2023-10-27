/// <reference types="cypress"/>

describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the App component', () => {
    cy.get('.App').should('be.visible');
  });

  it('should display the Incode Group logo with a link', () => {
    cy.get('.header__logo').should('be.visible');
    cy.get('.header__link').should(
      'have.attr',
      'href',
      'https://www.incode-group.com/',
    );
  });

  it('should display the "Finance Test Task" title', () => {
    cy.get('.header__title').should('be.visible');
    cy.get('.header__title').should('contain', 'Finance Test Task');
  });

  it('should display a list of tickers', () => {
    cy.get('.TickersList__list li').should('have.length.gt', 0);
  });

  it('should display the WatchList', () => {
    cy.get('.WatchList').should('be.visible');
  });

  it('should open and close the ticker modal', () => {
    cy.get('.TickerItem').first().click();
    cy.get('.TickerModal').should('be.visible');

    cy.get('.TickerModal__close').click();
    cy.get('.TickerModal').should('not.exist');
  });

  it('should display the search input', () => {
    cy.get('input').should('be.visible');
  });

  it('should add a ticker to the watchlist and then remove it', () => {
    cy.get('.TickerItem button:contains("Add")').first().click();
    cy.get('.TickerItem button:contains("Remove")').first().click();
  });

  it('should display a message if the TickersList is empty', () => {
    cy.get('.TickersList__empty').should('be.visible');
  });

  it('should display a message if the Watchlist is empty', () => {
    cy.get('.WatchList__empty').should('be.visible');
  });

  it('should filter tickers based on search query', () => {
    const searchQuery = 'Apple';
    cy.get('.TickersList__search').type(searchQuery);

    cy.get('.TickersList__list li').each(($li) => {
      cy.wrap($li)
        .find('.TickerItem__name')
        .should('contain.text', searchQuery);
    });
  });

  it('should sort tickers by name in ascending order', () => {
    cy.get('.TickersList__sort-button:contains("Name")').click();

    const tickerNames = [];

    cy.get('.TickerItem__name').each(($name) => {
      tickerNames.push($name.text());
    });

    expect(tickerNames).to.deep.equal(tickerNames.sort());
  });

  it('should sort tickers by name in descending order', () => {
    cy.get('.TickersList__sort-button:contains("Name")').click().click();

    const tickerNames = [];

    cy.get('.TickerItem__name').each(($name) => {
      tickerNames.push($name.text());
    });

    expect(tickerNames).to.deep.equal(tickerNames.sort().reverse());
  });

  it('should sort tickers by price in ascending order', () => {
    cy.get('.TickersList__sort-button:contains("Price")').click();

    const tickerPrices = [];

    cy.get('.TickerItem__price').each(($price) => {
      tickerPrices.push(parseFloat($price.text()));
    });

    expect(tickerPrices).to.deep.equal(tickerPrices.sort((a, b) => a - b));
  });

  it('should sort tickers by price in descending order', () => {
    cy.get('.TickersList__sort-button:contains("Price")').click().click(); 

    const tickerPrices = [];

    cy.get('.TickerItem__price').each(($price) => {
      tickerPrices.push(parseFloat($price.text()));
    });

    expect(tickerPrices).to.deep.equal(tickerPrices.sort((a, b) => b - a));
  });
});
