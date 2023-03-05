describe('Users', () => {

  Cypress.config().baseUrl = Cypress.env('api')
  const url = '/users'
  const user = {
    name: `teste delete`,
    email: 'delete@mail.com',
    password: 'qweqwe'
    // profile: 'manager'
  }
  const usersUpdate = {
    id: 1,
    name: `Lucas de sousa assunção ${new Date().getMinutes()}`,
    email: 'lucas@mail.com',
    // profile: 'manager'
  }

  let accessToken = ''

  before(() => {
   cy.login().then(res =>  accessToken = res.accessToken)
  })

  it('User create', () => {
    cy.request({
      method: 'post',
      url,
      body: user,
      failOnStatusCode: false,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    }).then(({ body, duration }) => {
      expect(duration).lessThan(1585)
      cy.delete({
        url,
        id: body.id,
        accessToken
      })
      expect(body).all.keys('id', 'name', 'email')

    })
  })

  it('User update', () => {
    cy.request({
      method: 'put',
      url: `${url}/1`,
      body: usersUpdate,
      failOnStatusCode: false, 
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(({ body, duration }) => {
      expect(duration).lessThan(1539)
      expect(body).deep.equal(usersUpdate)
    })

  })

  it('User show', () => {
    cy.request({
      url: `${url}/1`,
      failOnStatusCode: false,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(({ body, duration }) => {
      expect(duration).lessThan(583)
      expect(body).not.any.keys('password')
      expect(body).all.keys('id', 'name', 'email')
      // expect(body).all.keys('name', 'email', 'profile', 'image')
    })
  })

  it('Users List', () => {
    cy.request({
      url,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(({ body, duration }) => {
        expect(duration).lessThan(500)
        expect(body[0]).not.any.keys('password')
        expect(body[0]).all.keys('id', 'name', 'email')

        // expect(body[0]).all.keys('id', 'name', 'email', 'profile', 'image')
      })
  })

})

