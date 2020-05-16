const supertest = require("supertest")

const server = require('../api/server')
test("Get /", async () => {
    const endpoint = '/'
    const status = 200
    const res = await supertest(server).get("/")

    expect(res.statusCode).toBe(status);
    expect(res.type).toBe("application/json"); // res.type is shorthand for res.headers["content-type"]
    expect(res.body.message).toBe("Welcome to our API");
    expect(res.body.message).toMatch(/welcome/i); // case insensitive check for welcome somewhere in get response
})