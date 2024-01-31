const request = require("supertest");
const app = require("./index");
//Snapshot test
describe("App Snapshot Test", () => {
  it("should match the snapshot", async () => {
    const response = await request(app).get("/find/events");
    expect(response.body).toMatchSnapshot();
  });
});
