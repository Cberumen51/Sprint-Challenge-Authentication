const supertest = require('supertest')
const server = require('../api/server')

const db = require('../database/dbConfig')

beforeEach(async () => {
    await db.seed.run();
  });
  
  afterAll(async () => {
    await db.destroy();
  });

describe("people db integration tests", () => {
    it("GET /people", async () => {
      const res = await supertest(server).get("/people");
      expect(res.statusCode).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toHaveLength(4);
      expect(res.body[0].name).toBe("anna");
      expect(res.body[1].name).toBe("walker");
    })
})