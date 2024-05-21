import routes from "./tag.routes";
import request from "supertest";
import express from "express";
import tagTest from "../test/tagTest";
import UserTest from "../test/userTest";
import jwtoken from "../../Middleware/jwtoken";
import Maintenance from "../../Middleware/maintenance";

const app = express();
app.use(express.json());
app.use(jwtoken.verifyUser)
app.use(Maintenance.checkMaintenance)
routes(app);

describe("Tag Routes", () => {
    let tag1;
    let tag2;
    let tag3;
    let UserAdmin;
    let UserUser;
    let todelete;

    beforeAll(async () => {
        UserAdmin = await UserTest.createTestUser("mail@test.tag.com", "!Azerty123", "jhon", "Doe", true, "ADMIN");
        UserUser = await UserTest.createTestUser("user@user.tag.com", "!Userexample123", "User", "Model", true, "USER");
        tag1 = await tagTest.createTag([
            { name: "musique", language: "fr" },
            { name: "music", language: "en" },
        ]);
        tag2 = await tagTest.createTag([
            { name: "spectacle", language: "fr" },
            { name: "show", language: "en" },
        ]);
        tag3 = await tagTest.createTag([
            { name: "vernisage", language: "fr" },
            { name: "opening", language: "en" },
        ]);
    });

    afterAll(async () => {
        await tagTest.deleteTag(tag1.id);
        await tagTest.deleteTag(tag2.id);
        await tagTest.deleteTag(tag3.id);
        await UserTest.deleteTestUser(UserAdmin.user.id);
        await UserTest.deleteTestUser(UserUser.user.id);
    });

    describe("GET /tag", () => {
        it("User GUEST should return 200:OK", async () => {
            const response = await request(app).get("/tag/" + tag1.id);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });

        it("User USER should return 200:OK", async () => {
            const response = await request(app)
                .get("/tag/" + tag1.id)
                .set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });

        it("User ADMIN should return 200:OK", async () => {
            const response = await request(app)
                .get("/tag/" + tag1.id)
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });

        it("User ALL should return 400:Id is not a number", async () => {
            const response = await request(app).get("/tag/" + "test");
            expect(response.statusCode).toBe(400);
        });

        it("User ALL should return 404:Tag not found", async () => {
            const response = await request(app).get("/tag/" + 999999999);
            expect(response.statusCode).toBe(404);
        });
    });

    describe("GET /tags", () => {
        it("User GUEST should return 200:OK", async () => {
            const response = await request(app).get("/tags");
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });

        it("User ADMIN should return 200:OK", async () => {
            const response = await request(app).get("/tags").set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });

        it("User USER should return 200:OK", async () => {
            const response = await request(app).get("/tags").set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });
    });

    describe("POST /tag", () => {
        it("User GUEST should return 401:Unauthorized", async () => {
            const Response = await request(app)
                .post("/tag")
                .send([
                    { name: "test1", language: "fr" },
                    { name: "test1", language: "en" },
                ]);
            expect(Response.statusCode).toBe(401);
        });

        it("User USER should return 401:Unauthorized", async () => {
            const Response = await request(app)
                .post("/tag")
                .set("Cookie", `${UserUser.authCookie}`)
                .send([
                    { name: "test1", language: "fr" },
                    { name: "test1", language: "en" },
                ]);
            expect(Response.statusCode).toBe(401);
        });

        it("User ADMIN should return 200:OK", async () => {
            const Response = await request(app)
                .post("/tag")
                .set("Cookie", `${UserAdmin.authCookie}`)
                .send([
                    { name: "test1", language: "fr" },
                    { name: "test1", language: "en" },
                ]);
            expect(Response.statusCode).toBe(200);
            todelete = Response.body;
        });

        it("User ADMIN should return 400:Missing property", async () => {
            const Response = await request(app)
                .post("/tag")
                .set("Cookie", `${UserAdmin.authCookie}`)
                .send([{ name: "test1", language: "fr" }]);
            expect(Response.statusCode).toBe(400);
        });

        it("User ADMIN should return 400:Empty property", async () => {
            const Response = await request(app)
                .post("/tag")
                .set("Cookie", `${UserAdmin.authCookie}`)
                .send([{ name: "", language: "fr" }]);
            expect(Response.statusCode).toBe(400);
        });

        it("User ADMIN should return 400:Missing property", async () => {
            const Response = await request(app)
                .post("/tag")
                .set("Cookie", `${UserAdmin.authCookie}`)
                .send([{ name: "test1" }]);
            expect(Response.statusCode).toBe(400);
        });

        it("User ADMIN should return 400:Tag not created", async () => {
            const Response = await request(app)
                .post("/tag")
                .set("Cookie", `${UserAdmin.authCookie}`)
                .send([
                    { name: "test1", language: "fr" },
                    { name: "test1", language: "en" },
                ]);
            expect(Response.statusCode).toBe(400);
        });
    });

    describe("PUT /tag", () => {
        it("User GUEST should return 401:Unauthorized", async () => {
            const Response = await request(app)
                .put("/tag/" + tag1.id)
                .send([
                    { name: "test1", language: "fr" },
                    { name: "test1", language: "en" },
                ]);
            expect(Response.statusCode).toBe(401);
        });

        it("User USER should return 401:Unauthorized", async () => {
            const Response = await request(app)
                .put("/tag/" + tag1.id)
                .set("Cookie", `${UserUser.authCookie}`)
                .send([
                    { name: "test2", language: "fr" },
                    { name: "test2", language: "en" },
                ]);
            expect(Response.statusCode).toBe(401);
        });

        it("User ADMIN should return 200:OK", async () => {
            const Response = await request(app)
                .put("/tag/" + tag1.id)
                .set("Cookie", `${UserAdmin.authCookie}`)
                .send([
                    { name: "test3", language: "fr" },
                    { name: "test3", language: "en" },
                ]);
            expect(Response.statusCode).toBe(200);
        });

        it("User ADMIN should return 400:Missing property", async () => {
            const Response = await request(app)
                .put("/tag/" + tag1.id)
                .set("Cookie", `${UserAdmin.authCookie}`)
                .send([
                  { name: "test4", language: "fr" }
                ]);
            expect(Response.statusCode).toBe(400);
        });

        it("User ADMIN should return 400:Empty property", async () => {
            const Response = await request(app)
                .put("/tag/" + tag1.id)
                .set("Cookie", `${UserAdmin.authCookie}`)
                .send([
                    { name: "", language: "fr" },
                    { name: "test5", language: "en" },
                ]);
            expect(Response.statusCode).toBe(400);
        });

        it("Users ADMIN should return 404:Tag not found", async () => {
            const Response = await request(app)
                .put("/tag/" + 999999999)
                .set("Cookie", `${UserAdmin.authCookie}`)
                .send([
                    { name: "test6", language: "fr" },
                    { name: "toto", language: "en" },
                ]);
            expect(Response.statusCode).toBe(404);
        });
    });

    describe("DELETE /tag", () => {
        it("User GUEST should return 401:Unauthorized", async () => {
            const Response = await request(app).delete("/tag/" + tag1.id);
            expect(Response.statusCode).toBe(401);
        });

        it("User USER should return 401:Unauthorized", async () => {
            const Response = await request(app)
                .delete("/tag/" + tag1.id)
                .set("Cookie", `${UserUser.authCookie}`);
            expect(Response.statusCode).toBe(401);
        });

        it("User ADMIN should return 200:OK", async () => {
            const Response = await request(app)
                .delete("/tag/" + todelete.id)
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(Response.statusCode).toBe(200);
        });

        it("User ADMIN should return 400:Id is not a number", async () => {
            const Response = await request(app)
                .delete("/tag/" + "test")
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(Response.statusCode).toBe(400);
        });

        it("User ADMIN should return 404:Tag not found", async () => {
            const Response = await request(app)
                .delete("/tag/" + 999999999)
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(Response.statusCode).toBe(404);
        });
    });
});
