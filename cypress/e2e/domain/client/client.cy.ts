describe('client domain', () => {
  it('render page', () => {
    cy.visit('http://127.0.0.1:5173/clients')
    cy.get('h1').should('contain', 'Client')
  })
})
