
const login = require('../../app.js')

describe('Login functionality', () => {
  // test case for successful login
  test('valid credentials should login successfully', () => {
    const email = 'test@example.com'
    const password = 'password123'
    const loggedIn = login.Auth0Provider(email, password)
    expect(loggedIn).toBeTruthy()
  })

  // test case for incorrect password
  test('incorrect password should fail authentication', () => {
    const email = 'test@example.com'
    const password = 'wrongpassword'
    const loggedIn = login.Auth0Provider(email, password)
    expect(loggedIn).toBeFalsy()
  })

  // test case for non-existent email
  test('non-existent email should fail authentication', () => {
    const email = 'nonexistent@example.com'
    const password = 'password123'
    const loggedIn = login.auth(email, password)
    expect(loggedIn).toBeFalsy()
  })

  // test case for invalid email format
  test('invalid email format should throw error', () => {
    const email = 'invalidemailformat'
    const password = 'password123'
    expect(() => {
      login.auth(email, password)
    }).toThrow()
  })
})