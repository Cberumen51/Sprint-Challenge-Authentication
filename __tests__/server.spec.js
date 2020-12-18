const supertest = require('supertest')
const server = require('../api/server')


describe("GET /", function() {
  it("should return a response", function() {
  
      return supertest(server)
      .get("/")
      .then(response => {
      expect(response.status).toBeTruthy();
      })
  })
  it("returns a 404 status code for routes that don't exist", () => {
    return supertest(server).get("/doesnotexist").expect(404)
})

})

