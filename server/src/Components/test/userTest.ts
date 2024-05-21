import { IUser } from '../user/user.interface';
import { IRole } from '../role/role.interface';
import { createUser as createUserService, getUserByEmail, deleteUser } from '../user/user.service';
import jwtoken from '../../Middleware/jwtoken';
import { log } from 'node:console';
import cookieParser from '../../Utils/cookieParser';

class UserTest {
    email: string;
    password: string;
    profile: {
        firstName: string,
        lastName: string,
    };
    active: boolean;
    role: {
        role: IRole,
    };

    constructor(email: string, password: string, firstName: string, lastName: string, active: boolean, role: string ) {
        this.email = email;
        this.password = password;
        this.profile = {
            firstName: firstName,
            lastName: lastName,
        };
        this.active = active;
        this.role = {
            role: this.createRole(role),
        };
    }

    async createUser()  {
        const newUser = await createUserService(this.user);
        // log("newUser", newUser);
        if (newUser) {
            const user = await getUserByEmail(this.user.email);
            if (user) {
                const token = jwtoken.generateToken({ email: user.email, role: this.user.role.role.name }, "24h");
                return {
                    user: user,
                    authCookie: this.createCookie(user.email, this.user.role.role.name),
                    token: token,
                };
            }
        }
    }

    get user() {
        return {
            email: this.email,
            password: this.password,
            profile: {
                firstName: this.profile.firstName,
                lastName: this.profile.lastName,
            },
            active: this.active,
            role: {
                role: this.role.role,
            },
        };
    }

    createCookie(email:string, role: string):string {
        const token = jwtoken.generateToken({ email: email, role: role }, "24h");
        const cookie = cookieParser.createCookieString("token", token, {domain: process.env.COOKIEDOMAIN, path: "/", httpOnly: true, sameSite: "strict", secure: true, maxAge: 1000 * 60 * 60 * 24});
        return cookie;
    }


    createRole(role: string) {
        switch (role) {
            case "ADMIN":
                return <IRole> {
                    id: 1,
                    name: "ADMIN",
                };
            case "USER":
                return <IRole> {
                    id: 2,
                    name: "USER",
                };
            case "GUEST":
                return <IRole> {
                    id: 3,
                    name: "GUEST",
                };
        }
    }

    static  async  createTestUser(mail, password, firstName, lastName, active, role) {
        const User = await new UserTest(mail, password, firstName, lastName, active, role).createUser();
        return User;
    } 

    static async deleteTestUser(id: number) {
        await deleteUser(id);
    }
}

export default UserTest;

