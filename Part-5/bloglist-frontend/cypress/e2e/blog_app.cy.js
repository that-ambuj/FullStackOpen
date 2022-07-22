/* eslint-disable no-undef */
describe('Note app', () => {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/__reset')
        const firstUser = {
            username: 'tester',
            name: 'tester',
            password: 'tester#123',
        }
        const secondUser = {
            username: 'sam',
            name: 'sam',
            password: 'fisher#467',
        }
        cy.request('POST', 'http://localhost:3003/api/users/', firstUser)
        cy.request('POST', 'http://localhost:3003/api/users/', secondUser)
        cy.visit('http://localhost:3000')
    })

    it('user can login', function () {
        cy.get('#show-login').click()
        cy.get('#username').type('tester')
        cy.get('#password').type('tester#123')
        cy.get('#login-user').click()

        cy.contains('tester is logged in.')
    })

    it('wrong username or password gives an error', function () {
        cy.get('#show-login').click()
        cy.get('#username').type('obviouslyWrong')
        cy.get('#password').type('wrongpassword')
        cy.get('#login-user').click()

        cy.contains('Wrong Username or Password')
    })

    describe('when first user is logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'tester', password: 'tester#123' })

            const testBlogs = [
                {
                    title: 'First Blog',
                    author: 'Mark Handsome',
                    url: 'https://www.reactjs.org/',
                },
                {
                    title: 'Second Post',
                    author: 'Dan Abramov',
                    url: 'https://beta.reactjs.org/',
                },
                {
                    title: 'Blog with most likes',
                    author: 'popular',
                    url: 'https://www.google.com/',
                },
            ]

            cy.createBlog(testBlogs[0])
            cy.createBlog(testBlogs[1])
            cy.createBlog(testBlogs[2])

            cy.visit('http://localhost:3000')

            cy.get('#show-login').click()
            cy.get('#username').type('tester')
            cy.get('#password').type('tester#123')
            cy.get('#login-user').click()
        })

        it('should show first blog', function () {
            cy.get('.title').should('contain', 'First Blog')
        })

        it('blog form should update the ui', function () {
            cy.get('#create-blog').click()

            cy.get('#title-input').type('Input Blog')
            cy.get('#author-input').type('Cypress Bot')
            cy.get('#url-input').type('https://www.google.com/')

            cy.get('#submit-blog').click()

            cy.contains('Input Blog')
            cy.contains('Cypress Bot')
            cy.contains('New Blog Input Blog by Cypress Bot added.')
        })
        it('clicking on like button increases likes by 1', function () {
            cy.contains('First Blog')
                .parent()
                .find('button')
                .as('firstShowButton')
            cy.get('@firstShowButton').click()

            cy.contains('Likes : 0')

            cy.get('.like-button').click()

            cy.contains('Likes : 1')
        })
        it('blog with most likes should show first', function () {
            cy.contains('Blog with most likes')
                .parent()
                .find('button')
                .as('showButton')
            cy.get('@showButton').click()

            for(let i = 0; i < 15; i++) {
                cy.get('.like-button').click()
                cy.wait(400)
            }

            cy.visit('http://localhost:3000')
            cy.get('.box').first().find('button').click()
            cy.get('.box').first().should('contain', 'Likes : 15')
        })
    })

    describe('when second user is logged in', () => {
        beforeEach(function () {
            cy.login({ username: 'sam', password: 'fisher#467' })

            const testBlogs = [
                {
                    title: 'Created By Sam',
                    author: 'Sam',
                    url: 'https://www.ubisoft.com/',
                },
                {
                    title: 'Correctly Using useContext Hook',
                    author: 'Kent C. Dodds',
                    url: 'https://www.medium.com/',
                },
            ]

            cy.createBlog(testBlogs[0])
            cy.createBlog(testBlogs[1])

            cy.visit('http://localhost:3000')

            cy.get('#show-login').click()
            cy.get('#username').type('sam')
            cy.get('#password').type('fisher#467')
            cy.get('#login-user').click()
        })

        it('second user can delete their own blog', function () {
            cy.contains('Created By Sam')
                .parent()
                .find('button')
                .as('samButton')

            cy.get('@samButton').click()
            cy.get('@samButton').parent().should('contain', 'Delete')

            cy.get('.delete-button').click()

            cy.contains('Created By Sam').should('not.exist')
        })
    })

    describe('when second user logs in after first user', () => {
        beforeEach(function () {
            cy.login({ username: 'tester', password: 'tester#123' })

            cy.createBlog({
                title: 'blog by tester 1',
                author: 'This Computer',
                url: 'https://www.wikipedia.org',
            })
        })

        it('first user should see a delete button', () => {
            cy.get('#show-login').click()
            cy.get('#username').type('tester')
            cy.get('#password').type('tester#123')
            cy.get('#login-user').click()
            cy.contains('blog by tester 1').parent().find('button').click()

            cy.get('.delete-button').should('exist')
        })

        it('second user should not see a delete button', () => {
            cy.logout()

            cy.get('#show-login').click()
            cy.get('#username').type('sam')
            cy.get('#password').type('fisher#467')
            cy.get('#login-user').click()

            cy.contains('blog by tester 1').parent().find('button').click()

            cy.get('.delete-button').should('have.css', 'display', 'none')
        })
    })
})
