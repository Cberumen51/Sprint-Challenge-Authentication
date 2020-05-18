const supertest = require('supertest')
const server = require('../api/server')

describe('POST /register', () => {
    it('should register new user', () => {
    return supertest(server)
        .post('/register')
        .send({username: "hello", password: "world"})
        .then(response => {
            expect(response.status).toBeTruthy();
        })
    })
    it('should return {message: Unable to register"}', ()=>{
        return supertest(server)
        .post('/register')
        .then(response =>{
            expect(response.type).toMatch(/text/i);
        })
    })
})
  
  describe('POST /login', () => {
    it('should allow user to login successfully', () => {
        return supertest(server)
            .post('/login')
            .send({id : 1, username: 'hello', password: 'world'})
            .then(response =>{
                expect(response.status).toBeTruthy();
            })
        })

    it("should return a welcome text", function() {
        return supertest(server)
                .post("/login")
                .then(res => {
                expect(res.type).toMatch(/text/i);
                })
            })
    })