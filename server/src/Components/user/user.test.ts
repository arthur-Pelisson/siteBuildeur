import routes from "./user.routes";
import request from "supertest";
import express from "express";
import UserTest from "../test/userTest";
import { log } from "node:console";
import jwtoken from "../../Middleware/jwtoken";
import Maintenance from "../../Middleware/maintenance";

const app = express();
app.use(express.json());
app.use(jwtoken.verifyUser)
app.use(Maintenance.checkMaintenance)
routes(app);

describe("User Routes", () => {
    let UserAdmin;
    let UserUser;
    let todelete;
    let UserUserForTest;
    let UserUserForDelete;

    beforeAll(async () => {
        UserAdmin = await UserTest.createTestUser("mail@test.user.com", "!Azerty123", "jhon", "Doe", true, "ADMIN");
        UserUser = await UserTest.createTestUser("user@user.user.com", "!Userexample123", "User", "Model", true, "USER");
        UserUserForTest = await UserTest.createTestUser("user@user.usertest.com", "!Userexample123", "User", "Model", true, "USER");
        UserUserForDelete = await UserTest.createTestUser("user@user.usertesttodelete.com", "!Userexample123", "User", "Model", true, "USER");
        // log("User admin : ", UserAdmin);
        // log("authCookie : ", UserAdmin.authCookie);
    });

    afterAll(async () => {
        await UserTest.deleteTestUser(UserAdmin.user.id);
        await UserTest.deleteTestUser(UserUser.user.id);
        await UserTest.deleteTestUser(todelete.id);
    });

    describe("GET /users", () => {
        it("User ADMIN should return 200:OK", async () => {
            const response = await request(app).get("/users").set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBeGreaterThan(2);
        });

        it("User USER should return 401:Unauthorized", async () => {
            const response = await request(app).get("/users").set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });

        it("User GEST should return 401:Unauthorized", async () => {
            const response = await request(app).get("/users");
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });
    });

    describe("GET /user/:id", () => {
        it("User ADMIN should return 200:OK", async () => {
            const response = await request(app).get(`/user/${UserAdmin.user.id}`).set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });

        it("User ADMIN should return 200:OK", async () => {
            const response = await request(app).get(`/user/${UserUser.user.id}`).set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });

        it("User USER should return 200:OK", async () => {
            const response = await request(app).get(`/user/${UserUser.user.id}`).set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });

        it("User USER should return 401:Unauthorized", async () => {
            const response = await request(app).get(`/user/${UserAdmin.user.id}`).set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });

        it("User GEST should return 401:Unauthorized", async () => {
            const response = await request(app).get(`/user/${UserUser.user.id}`);
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });

        it("User ADMIN should return 400:Bad request", async () => {
            const response = await request(app).get(`/user/0`).set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe("User not found");
        });
    });

    describe("POST /user", () => {
        it("User ADMIN should return 200:OK", async () => {
            const response = await request(app)
                .post(`/user`)
                .send({
                    email: "mailtestuser@test1.com",
                    password: "!Azerty123",
                    firstName: "jhon",
                    lastName: "Doe",
                    active: true,
                    roleId: 1,
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
            // log("new user : ", response.body);
            todelete = response.body;
        });

        it("User ADMIN should return 400:Email already exist", async () => {
            const response = await request(app)
                .post(`/user`)
                .send({
                    email: "mailtestuser@test1.com",
                    password: "Azerty123",
                    firstName: "jhon",
                    lastName: "Doe",
                    active: true,
                    roleId: 1,
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
        });

        it("User ADMIN should return 400:Invalide email", async () => {
            const response = await request(app)
                .post(`/user`)
                .send({
                    email: "mailtestusertest1com",
                    password: "Azerty123",
                    firstName: "jhon",
                    lastName: "Doe",
                    active: true,
                    roleId: 1,
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
        });

        it("User ADMIN should return 400: invalide password", async () => {
            const response = await request(app)
                .post(`/user`)
                .send({
                    email: "mailtestuser@test1.com",
                    password: "123456879",
                    firstName: "jhon",
                    lastName: "Doe",
                    active: true,
                    roleId: 1,
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
        });


        it("User ADMIN should return 400:Role not found", async () => {
            const response = await request(app)
                .post(`/user`)
                .send({
                    email: "mailtestuser@test2.com",
                    password: "!Azerty123",
                    firstName: "jhon",
                    lastName: "Doe",
                    active: true,
                    roleId: 55,
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe("Role not found");
        });

        it("User ADMIN should return 400:Missing property", async () => {
            const response = await request(app)
                .post(`/user`)
                .send({
                    email: "",
                    password: "!Azerty123",
                    firstName: "jhon",
                    lastName: "Doe",
                    active: true,
                    roleId: 1,
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe("Missing property");
        });

        it("User ADMIN should return 400:Missing property", async () => {
            const response = await request(app)
                .post(`/user`)
                .send({
                    password: "!Azerty123",
                    firstName: "jhon",
                    lastName: "Doe",
                    active: true,
                    roleId: 1,
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe("Missing property");
        });

        it("User USER should return 401:Unauthorized", async () => {
            const response = await request(app)
                .post(`/user`)
                .send({
                    email: "mailtestuser@test3.com",
                    password: "!Azerty123",
                    firstName: "jhon",
                    lastName: "Doe",
                    active: true,
                    roleId: 1,
                })
                .set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });

        it("User GEST should return 401:Unauthorized", async () => {
            const response = await request(app).post(`/user`).send({
                email: "mailtestuser@test2.com",
                password: "Azerty123",
                firstName: "jhon",
                lastName: "Doe",
                active: true,
                roleId: 1,
            });
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });
    });

    describe("PUT /user/:id", () => {

        it("User ADMIN should return 200:OK", async () => {
            const response = await request(app).put(`/user/${UserUser.user.id}`).send({
                email: "user@user.user.com",
                firstName: "rename",
                lastName: "rename",
                active: true,
                role: 2,
            })
            .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe("User updated");
        });

        it("User ADMIN should return 400:Missing property", async () => {
            const response = await request(app)
                .put(`/user/${UserUser.user.id}`)
                .send({
                    firstName: "rename",
                    lastName: "rename",
                    active: true,
                    roleId: 1,
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe("Missing property");
        });

        it("User ADMIN should return 400:Invalide email", async () => {
            const response = await request(app).put(`/user/${UserUser.user.id}`).send({
                email: "mailtestusertest2com",
                firstName: "rename",
                lastName: "rename",
                active: true,
                roleId: 1,
            });
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });

        it("User ADMIN should return 400:Id is not a number", async () => {
            const response = await request(app)
                .put(`/user/toto`)
                .send({
                    email: "mailtestuser@test2.com",
                    firstName: "rename",
                    lastName: "rename",
                    active: true,
                    roleId: 1,
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe(JSON.stringify({ fr: "Id n'est pas un nombre", en: "Id is not a number" }));
        });

        it("User ADMIN should return 400:User not found", async () => {
            const response = await request(app).put(`/user/0`).send({
                email: "mailtestuser@test2.com",
                firstName: "rename",
                lastName: "rename",
                active: true,
                roleId: 1,
            });
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });

        it("User USER should return 200:User updated", async () => {
            const response = await request(app)
                .put(`/user/${UserUser.user.id}`)
                .send({
                    email: "user@user.user.com",
                    firstName: "renamee",
                    lastName: "renamee",
                })
                .set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe(JSON.stringify({ fr: "Profile mis à jour", en: "Profile updated" }));
        });

        it("User USER should return 400: Unauthorized", async () => {
            const response = await request(app)
                .put(`/user/${UserUserForTest.user.id}`)
                .send({
                    email: "mailtestuser@test2.com",
                    firstName: "rename",
                    lastName: "rename",
                    active: true,
                    roleId: 1,
                })
                .set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });

        it("User USER should return 400: Unauthorized", async () => {
            const response = await request(app)
                .put(`/user/${UserAdmin.user.id}`)
                .send({
                    email: "mailtestuser@test2.com",
                    firstName: "rename",
                    lastName: "rename",
                    active: true,
                    roleId: 1,
                })
                .set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });

        it("User GEST should return 401:Unauthorized", async () => {
            const response = await request(app).put(`/user/${UserUser.user.id}`).send({
                email: "mailtestuser@test2.com",
                firstName: "rename",
                lastName: "rename",
                active: true,
                roleId: 1,
            });
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });
    });

    describe("PATCH /user/:id", () => {
        it("User ADMIN should return 400:Missing property", async () => {
            const response = await request(app).patch(`/user/change_password/profile`)
            .send({})
            .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe(JSON.stringify({fr: "Propriété manquante", en: "Missing property"}));
        });

        it("User ADMIN should return 400:Missing property", async () => {
            const response = await request(app)
                .patch(`/user/change_password/profile`)
                .send({
                    newPassword: "",
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe(JSON.stringify({fr: "Propriété manquante", en: "Missing property"}));
        });

        it("User ADMIN should return 400:Invalide password", async () => {
            const response = await request(app)
                .patch(`/user/change_password/profile`)
                .send({
                    newPassword: "azazeze",
                    password: "!Azerty123",
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe(JSON.stringify({fr: "Mot de passe invalide", en: "Invalide password"}));
        });
        

        
        it("User USER should return 400:Missing property", async () => {
            const response = await request(app)
                .patch(`/user/change_password/profile`)
                .send({
                    password: "",
                    newPassword: "!Azerty1234",
                })
                .set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe(JSON.stringify({fr: "Propriété manquante", en: "Missing property"}));
        });

        it("User USER should return 200:OK", async () => {
            const response = await request(app)
                .patch(`/user/change_password/profile`)
                .send({
                    password: "!Userexample123",
                    newPassword: "!Userexample1234",
                })
                .set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe(JSON.stringify({fr: "Mot de passe mis à jour", en: "Password updated"}));
        });

        it("User ADMIN should return 200:OK", async () => {
            const response = await request(app)
                .patch(`/user/change_password/profile`)
                .send({
                    newPassword: "!Azerty12345",
                    password: "!Azerty123",
                })
                .set("Cookie", `${UserAdmin.authCookie}`);
            // log(response.text);
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe(JSON.stringify({fr: "Mot de passe mis à jour", en: "Password updated"}));
        });

    });

    describe("DELETE /user/:id", () => {
        it("User ADMIN should return 200:OK", async () => {
            const response = await request(app).delete(`/user/${UserUserForTest.user.id}`).set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe("User deleted");
        });

        it("User ADMIN shoud return 400: Id is not a number", async () => {
            const response = await request(app).delete(`/user/toto`).set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe("Id is not a number");
        });

        it("User ADMIN should return 400:User not found", async () => {
            const response = await request(app).delete(`/user/0`).set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe("User not found");
        });

        it("User ADMIN should return 400:Id is not a number", async () => {
            const response = await request(app).delete(`/user/toto`).set("Cookie", `${UserAdmin.authCookie}`);
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe("Id is not a number");
        });

        it("User USER should return 401:Unauthorized", async () => {
            const response = await request(app).delete(`/user/${UserAdmin.user.id}`).set("Cookie", `${UserUser.authCookie}`);
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });

        it('User USER should return 200:OK', async () => {
            const response = await request(app).delete(`/user/${UserUserForDelete.user.id}`).set("Cookie", `${UserUserForDelete.authCookie}`);
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe('User deleted');
        });

        it("User GEST should return 401:Unauthorized", async () => {
            const response = await request(app).delete(`/user/${UserAdmin.user.id}`);
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("Unauthorized");
        });
    });
});
