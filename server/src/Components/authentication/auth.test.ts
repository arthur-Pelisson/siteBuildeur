import request from "supertest";
import express from "express";
import routes from "./auth.routes";
import { deleteUser, getUserByEmail } from "../user/user.service";
import { getActivateTokenByEmailUser, getResetPasswordTokenByEmailUser } from "./auth.service";


const app = express();
app.use(express.json());
routes(app);

const rightUser = {
    email: "pelisson.arthur.test@gmail.com",
    password: "!Password123",
    firstName: "John",
    lastName: "Doe",
};

describe("Auth Routes", () => {

    describe("POST /auth/register", () => {

        it("should create a new user when registering with valid data", async () => {
            const response = await request(app).post("/auth/register").send({
                email: rightUser.email,
                password: rightUser.password,
                firstName: rightUser.firstName,
                lastName: rightUser.lastName,
            });

            expect(response.statusCode).toBe(200);
        });

        it("should return 400:Missing property, cause of: empty data", async () => {
            const response = await request(app).post("/auth/register").send({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
            });

            expect(response.statusCode).toBe(400);
        });

        it("should return 400:Invalide email, cause of: don't passe regex email", async () => {
            const response = await request(app).post("/auth/register").send({
                email: "totototo.com",
                password: "!Example12313",
                firstName: "Jhon",
                lastName: "Doe",
            });

            expect(response.statusCode).toBe(400);
        });

        it("should return 400:Invalide email, cause of: don't passe regex email", async () => {
            const response = await request(app).post("/auth/register").send({
                email: "toto@totocom",
                password: "Example12313",
                firstName: "Jhon",
                lastName: "Doe",
            });

            expect(response.statusCode).toBe(400);
        });

        it("should return 400:Invalide password, cause of: don't passe regex password", async () => {
            const response = await request(app).post("/auth/register").send({
                email: "toto@toto.com",
                password: "exam",
                firstName: "Jhon",
                lastName: "Doe",
            });

            expect(response.statusCode).toBe(400);
        });

        it("should return 400:Invalide password, cause of: don't passe regex password", async () => {
            const response = await request(app).post("/auth/register").send({
                email: "toto@toto.com",
                password: "Example123",
                firstName: "Jhon",
                lastName: "Doe",
            });

            expect(response.statusCode).toBe(400);
        });

        it("should return 400:Invalide password, cause of: don't passe regex password", async () => {
            const response = await request(app).post("/auth/register").send({
                email: "toto@toto.com",
                password: "example",
                firstName: "Jhon",
                lastName: "Doe",
            });

            expect(response.statusCode).toBe(400);
        });
    });

    describe("POST /auth/login, before activate account", () => {
        it("should return 400:false, when logging in with valid credentials but account not activated", async () => {
            const response = await request(app).post("/auth/login").send({
                email: rightUser.email,
                password: rightUser.password,
            });
            expect(response.statusCode).toBe(400);
        });
    });

    describe("GET /auth/activate/:token", () => {
        
        it("should return a 400:false, when invalide token ", async () => {
            let token = await getActivateTokenByEmailUser(rightUser.email);
            token += "a";
            const response = await request(app).get(`/auth/activate/${token}`);
            expect(response.statusCode).toBe(400);
        });

        it("should return a 200:true, when go to token activated ", async () => {
            const token = await getActivateTokenByEmailUser(rightUser.email);
            const response = await request(app).get(`/auth/activate/${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });
    });

    describe("POST /auth/login, after activate account", () => {
        it("should return 200: stringtoken, when logging in with valid credentials", async () => {
            const response = await request(app).post("/auth/login").send({
                email: rightUser.email,
                password: rightUser.password,
            });

            expect(response.statusCode).toBe(200);
            expect(response.body).toBeTruthy();
        });

        it("should return a 400 status when logging in with invalid credentials", async () => {
            const response = await request(app).post("/auth/login").send({
                email: "invalid@example.com",
                password: "invalidPassword",
            });

            expect(response.statusCode).toBe(400);
        });
    });

    describe("POST /auth/forgot-password", () => {
        it("should return 400:Missing email, cause of: empty data", async () => {
            const response = await request(app).post("/auth/forgot-password").send({
                email: "",
            });

            expect(response.statusCode).toBe(400);
        });

        it("It should return 400:User not found, cause of: email not found", async () => {
            const response = await request(app).post("/auth/forgot-password").send({
                email: "wrongexample@gmail.com",
            });

            expect(response.statusCode).toBe(400);
        });

        it("It should return 200: Email send, cause of: email found", async () => {
            const response = await request(app).post("/auth/forgot-password").send({
                email: rightUser.email,
            });

            expect(response.statusCode).toBe(200);
        });

    });

    describe("POST /auth/reset-password/:token", () => {
        it("should return 400:Missing password, cause of: empty data", async () => {
            const token = await getResetPasswordTokenByEmailUser(rightUser.email);
            const response = await request(app).post(`/auth/reset-password/${token}`).send({
                password: "",
            });

            expect(response.statusCode).toBe(400);
            expect(response.text).toBe(JSON.stringify({fr: "Token ou mot de passe manquant", en: "Missing token or password"}));
        });

        it("should return 400:Invalide password, cause of: don't passe regex password", async () => {
            const token = await getResetPasswordTokenByEmailUser(rightUser.email);
            const response = await request(app).post(`/auth/reset-password/${token}`).send({
                password: "example",
            });

            expect(response.statusCode).toBe(400);
        });

        it("Should rturn 400:Invalid token, cause of: invalide token", async () => {
            const response = await request(app).post(`/auth/reset-password/123456789`).send({
                password: "!Example123",
            });

            expect(response.statusCode).toBe(400);
        });

        it("should return 200:true, cause of: password changed", async () => {
            const token = await getResetPasswordTokenByEmailUser(rightUser.email);
            const response = await request(app).post(`/auth/reset-password/${token}`).send({
                password: "!Example123",
            });

            expect(response.statusCode).toBe(200);
        });
    });

    // delete user after the test
    describe("DELETE /delete", () => {
        it("should delete testuser after the test auth", async () => {
            const user = await getUserByEmail(rightUser.email);
            if (user) {
                const deleted = deleteUser(user.id);
                if (deleted) {
                    return true;
                }
                return false;
            }
        });
    });
    
});
