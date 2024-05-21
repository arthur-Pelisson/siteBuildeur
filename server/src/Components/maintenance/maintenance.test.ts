import request from "supertest";
import express from "express";
import routes from "./maintenance.routes";
import userRoute from "../user/user.routes";
import { deleteUser } from "../user/user.service";
import UserTest from "../test/userTest";
import { log } from "node:console";
import { Response } from 'express';
import jwtoken from "../../Middleware/jwtoken";
import Maintenance from "../../Middleware/maintenance";

const app = express();
app.use(express.json());
app.use(jwtoken.verifyUser)
app.use(Maintenance.checkMaintenance)
routes(app);
userRoute(app);


describe("Maintenance Routes", () => {

    let UserAdmin;
    let UserUser;
  
    beforeAll(async () => {
      UserAdmin = await UserTest.createTestUser("mail@test.maintenance.com", "!Azerty123", "jhon", "Doe", true, "ADMIN");
      UserUser = await UserTest.createTestUser("user@user.maintenance.com", "!Userexample123", "User", "Model", true, "USER");
    });

    afterAll(async () => {
        await UserTest.deleteTestUser(UserAdmin.user.id);
        await UserTest.deleteTestUser(UserUser.user.id);
       
    });


    describe("PATCH /maintenance to true", () => {
        it("User  USER should return 400: Unauthorized", async () => {
            const Response = await request(app)
                .patch("/maintenance")
                .set("Cookie", UserUser.authCookie)
                .send({status: true});
            expect(Response.statusCode).toBe(401);
            expect(Response.text).toBe("Unauthorized");
        });

        it("User  ADMIN should return 200: OK", async () => {
            const Response = await request(app)
                .patch("/maintenance")
                .set("Cookie", UserAdmin.authCookie)
                .send({status: true});
            expect(Response.statusCode).toBe(200);
            expect(Response.text).toBeTruthy();
        });
    });
    
    describe("GET /maintenance", () => {

        it("User ADMIN should return 200:OK", async () => {
            const response = await request(app)
                .get("/maintenance")
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.text).toBeTruthy();
        });

        it("User USER should return 200:OK", async () => {
            const response = await request(app)
                .get("/maintenance")
                .set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.text).toBeTruthy();
        });

        it("User GEST should return 200:OK", async () => {
            const response = await request(app)
                .get("/maintenance")
            expect(response.statusCode).toBe(200);
            expect(response.text).toBeTruthy();
        });
    });


    describe("GET Another routes with maintenance on", () => {

        it("User ADMIN should return 200:Service ok", async () => {
            const response = await request(app)
                .get("/users")
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.text).toBeTruthy();  
        });

        it("User USER should return 503:Service Unavailable", async () => {
            const response = await request(app)
                .get("/user")
                .set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(503);
            expect(response.text).toBeTruthy();  
        });

        it("User GEST should return 503:Service Unavailable", async () => {
            const response = await request(app)
                .get("/user")
            expect(response.statusCode).toBe(503);
            expect(response.text).toBeTruthy();
        });
    });

    describe("PUT /maintenance", () => {
        it("User ADMIN should return 200:OK", async () => {
            const response = await request(app)
                .put("/maintenance")
                .send({
                    active: true,
                    translations: [
                        {
                            message: "Le site est en maintenance, veuillez réessayer plus tard.",
                            language: "fr",
                        },
                        {
                            message: "The site is under maintenance, please try again later.",
                            language: "en",
                        },
                    ],
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.text).toBeTruthy();
        });

        it("User ADMIN should return 200:OK", async () => {
            const response = await request(app)
                .put("/maintenance")
                .send({
                    active: true,
                    message: "test",
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe("Missing properties");
        });

        it("User USER should return 403:Forbidden", async () => {
            const response = await request(app)
                .put("/maintenance")
                .send({
                    active: true,
                    message: "test",
                })
                .set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });

        it("User GEST should return 403:Forbidden", async () => {
            const response = await request(app)
                .put("/maintenance")
                .send({
                    active: true,
                    message: "test",
                })
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });
        
        it("User  ADMIN should return 200: OK", async () => {
            const Response = await request(app)
                .patch("/maintenance")
                .set("Cookie", UserAdmin.authCookie)
                .send({status: false});
            expect(Response.statusCode).toBe(200);
            expect(Response.text).toBeTruthy();
        });
    });
});
