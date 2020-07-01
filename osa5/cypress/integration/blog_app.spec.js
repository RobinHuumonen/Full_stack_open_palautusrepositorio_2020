const { func } = require("prop-types")

describe("Blog app's", function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'superuser',
      username: 'root',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login from is shown', function() {
    cy.contains('Log in to application')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login_button').click()

      cy.contains('Blogs')
      cy.contains('logged in')
    })

    it.only('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('wreong')
      cy.get('#login_button').click()

      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 255)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})