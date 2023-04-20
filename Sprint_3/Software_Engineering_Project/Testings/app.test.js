import request from 'supertest'
import app from './app.js'


describe("POST /users", () => {
  describe("given a username and password", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/users").send({
        email: "username",
        password: "password"
      })
      expect(response.statusCode).toBe(200)
    })
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/users").send({
        email: "username",
        password: "password"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test("response has userId", async () => {
      const response = await request(app).post("/users").send({
        email: "username",
        password: "password"
      })
      expect(response.body.userId).toBeDefined()
    })
  })

  describe("when the username and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {email: "username"},
        {password: "password"},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })

})


describe("POST /events", () => {
  describe("given a events and user", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/events").send({
        events: "events",
        user: "userName"
      })
      expect(response.statusCode).toBe(200)
    })

    test("response has userId", async () => {
      const response = await request(app).post("/events").send({
        events: "events",
        user: "userName"
      })
      expect(response.body.userId).toBeDefined()
    })

    describe("when the username is not able to signup or login then user cannot able to create the events", () => {
      test("should respond with a status code of 400", async () => {
        const bodyData = [
          {user: "username"},
          {}
        ]
        for (const body of bodyData) {
          const response = await request(app).post("/events").send(body)
          expect(response.statusCode).toBe(400)
        }
      })
    })
  })
  })
  describe("PUT /:id", () => {
    describe("given a events and user", () => {
  
      test("should respond with a 200 status code", async () => {
        const response = await request(app).put("/:id").send({
          events: "events",
          user: "userName"
        })
        expect(response.statusCode).toBe(200)
      })

      test("response has userId to update or edit wishgames", async () => {
        const response = await request(app).put("/:id").send({
          events: "events",
          user: "userName"
        })
        expect(response.body.userId).toBeDefined()
      })

      describe("when the username missing fill the edit ", () => {
        test("should respond with a status code of 400", async () => {
          const bodyData = [
            {user: "username"},
            {events: "events"},
            {}
          ]
          for (const body of bodyData) {
            const response = await request(app).put("/:id").send(body)
            expect(response.statusCode).toBe(400)
          }
        })
      })
    })
  })

  

  describe("GET /:id", () => {
    describe("given a events and user", () => {
  
      test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/:id").send({
          events: "events",
          user: "userName"
        })
        expect(response.statusCode).toBe(200)
      })

      test("response has user able to see the details of game lists when click on the links", async () => {
        const response = await request(app).get("/:id").send({
          events: "events",
          user: "userName"
        })
        expect(response.body.userId).toBeDefined()
      })

      describe("when the user not able to see the details ", () => {
        test("should respond with a status code of 400", async () => {
          const bodyData = [
            {user: "username"},
            {events: "events"},
            {}
          ]
          for (const body of bodyData) {
            const response = await request(app).put("/:id").send(body)
            expect(response.statusCode).toBe(400)
          }
        })
      })
    })
  })