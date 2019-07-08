/// <reference types="cypress" />

describe('Ingredients List', () => {
  context('Empty list', () => {
    it('should have an empty list of ingredients', () => {
      cy.visit('http://localhost:9000/')
      cy.contains('Ingredients (0)')
    })

    it('should have an instruction message', () => {
      cy.contains('Select one or more recipes to see the ingredients list.')
    })
  })

  context('Full list', () => {
    it('should list ingredients for the first recipe', () => {
      cy.visit('http://localhost:9000/')
      cy.contains('Risotto').click()

      cy.get('.ingredients-list').should('have.length', 1)
      cy.get('.ingredients-list .ingredient').should('have.length', 8)
    })

    it('should list ingredients for the first and second recipes', () => {
      cy.visit('http://localhost:9000/')

      cy.contains('Risotto').click()
      cy.get('.ingredients-list').should('have.length', 1)
      cy.get('.ingredients-list .ingredient').should('have.length', 8)

      cy.contains('Enchiladas').click()
      cy.get('.ingredients-list .ingredient').should('have.length', 15)
    })
  })

  context('Empty list after deselecting recipes', () => {
    it('should list ingredients for the first and second recipes', () => {
      cy.visit('http://localhost:9000/')

      cy.contains('Risotto').click()
      cy.get('.ingredients-list').should('have.length', 1)
      cy.get('.ingredients-list .ingredient').should('have.length', 8)

      cy.contains('Enchiladas').click()
      cy.get('.ingredients-list .ingredient').should('have.length', 15)
    })

    it('should unlist ingredients for the first and second recipes', () => {
      cy.contains('Risotto').click()
      cy.get('.ingredients-list').should('have.length', 1)
      cy.get('.ingredients-list .ingredient').should('have.length', 8)

      cy.contains('Enchiladas').click()
      cy.get('.ingredients-list .ingredient').should('have.length', 0)
      cy.get('.ingredients-list').should('have.length', 0)
    })
  })
})
