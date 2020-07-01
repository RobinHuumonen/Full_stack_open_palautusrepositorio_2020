describe("Blog app's", function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('login from is shown', function() {
    cy.contains('Log in to application')
    cy.contains('login')
  })
})