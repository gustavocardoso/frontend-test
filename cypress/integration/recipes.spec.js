/// <reference types="cypress" />

describe('Recipes List', () => {
  context('List', () => {
    it('should have a list of recipes', () => {
      cy.visit('http://localhost:9000/')

      cy.get('.recipes-list').should('have.length', 1)
      cy.get('.recipes-list .item').should('have.length', 8)
    })
  })

  context('Selecting recipes', () => {
    it('should select a recipe', () => {
      cy.visit('http://localhost:9000/')

      cy.contains('Risotto')
        .click()
        .parent()
        .parent()
        .should('have.class', 'item')
        .should('have.attr', 'data-selected', 'true')
    })

    it('should select three recipes', () => {
      cy.visit('http://localhost:9000/')

      cy.contains('Risotto')
        .click()
        .parent()
        .parent()
        .should('have.class', 'item')
        .should('have.attr', 'data-selected', 'true')

      cy.contains('Hummus')
        .click()
        .parent()
        .parent()
        .should('have.class', 'item')
        .should('have.attr', 'data-selected', 'true')

      cy.contains('Pancakes')
        .click()
        .parent()
        .parent()
        .should('have.class', 'item')
        .should('have.attr', 'data-selected', 'true')
    })
  })

  context('Deselecting recipes', () => {
    it('should select and deselect a recipe', () => {
      cy.visit('http://localhost:9000/')

      cy.contains('Risotto')
        .click()
        .parent()
        .parent()
        .should('have.attr', 'data-selected', 'true')
        .click()
        .should('have.attr', 'data-selected', 'false')
    })

    it('should select and deselect two recipes', () => {
      cy.visit('http://localhost:9000/')

      cy.contains('Risotto')
        .click()
        .parent()
        .parent()
        .should('have.attr', 'data-selected', 'true')
        .click()
        .should('have.attr', 'data-selected', 'false')

      cy.contains('Hummus')
        .click()
        .parent()
        .parent()
        .should('have.attr', 'data-selected', 'true')
        .click()
        .should('have.attr', 'data-selected', 'false')
    })
  })
})
