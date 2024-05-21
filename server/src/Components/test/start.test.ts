import request from "supertest";
import App from "../../config/app";

describe("Test the root path", () => {
  test("It should respond to the GET method with status 200", async () => {
    if (!App.app) App.init();
    App.app.on('appStarted', async ()  => {
      const response = await request(App.app).get("/test");
      expect(response.status).toBe(200);
    });
  });
});
