describe('Smoke tests', () => {
  it('should visit application page', () => {
    cy.visit('http://localhost:9000/')
  })

  it('should check for basic elements', () => {
    context('Page loaded', () => {
      cy.get('.app-header').should('have.length', 1)
      cy.get('.content').should('have.length', 1)
      cy.get('.recipes').should('have.length', 1)
      cy.get('.ingredients').should('have.length', 1)
      cy.get('.app-footer').should('have.length', 1)
    })
  })
})
