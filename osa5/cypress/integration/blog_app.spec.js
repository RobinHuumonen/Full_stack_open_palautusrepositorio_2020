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

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('wreong')
      cy.get('#login_button').click()

      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 255)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'salainen' })
    })
    it('a blog can be created', function() {
      cy.get('#create_blog_button').click()
      cy.get('#title').type('Blog from Cypress e2e test')
      cy.get('#author').type('root')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create_button').click()

      cy.contains('Blog from Cypress e2e test root')
      cy.get('.notification')
        .should('contain', 'A new blog Blog from Cypress e2e test by root added')
        .and('have.css', 'color', 'rgb(255, 0, 255)')
        .and('have.css', 'border-style', 'solid')
    })

    describe('and blog exists', function() {
      beforeEach(function() {
        cy.login({ username: 'root', password: 'salainen' })
        cy.createBlog({
          title: 'Another blog from Cypress',
          author: 'root',
          url: 'www.rootinkotisivut.fi'
        })
      })
      it('a blog can be liked', function() {
        cy.get('#view_button').click()
        cy.get('#like_button').click()

        cy.get('.notification')
          .should('contain', 'Added like to Another blog from Cypress')
          .and('have.css', 'color', 'rgb(255, 0, 255)')
          .and('have.css', 'border-style', 'solid')
      })

      it('a certified user can remove its blog', function() {
        cy.get('#view_button').click()
        cy.get('#remove_button').click()

        cy.get('.notification')
          .should('contain', 'Removed Another blog from Cypress')
          .and('have.css', 'color', 'rgb(255, 0, 255)')
          .and('have.css', 'border-style', 'solid')
      })
    })

    describe('and several blogs exists', function() {
      beforeEach(function() {
        cy.login({ username: 'root', password: 'salainen' })
        cy.createBlog({
          title: 'Most likes',
          author: 'root',
          url: 'www.rootinkotisivut.fi',
          likes: 1000
        })
        cy.createBlog({
          title: '2nd most likes',
          author: 'root',
          url: 'www.rootinkotisivut.fi',
          likes: 100
        })
        cy.createBlog({
          title: 'Least likes',
          author: 'root',
          url: 'www.rootinkotisivut.fi',
          likes: 10
        })
      })

      it.only('blogs are sorted from most liked to least liked', function() {
        cy.get('.showMore')
          .then(function(blogs) {
            cy.wrap(blogs[0]).contains('Most likes')
            cy.wrap(blogs[1]).contains('2nd most likes')
            cy.wrap(blogs[2]).contains('Least likes')
          })
      })
    })
  })
})