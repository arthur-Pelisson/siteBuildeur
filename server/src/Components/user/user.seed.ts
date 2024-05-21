import UserTest from "../test/userTest";

async function main() {
    const UserAdmin = await UserTest.createTestUser("mail@seed.admin.com", "!Azerty123", "jhon", "Doe", true, "ADMIN");
    const UserUser = await UserTest.createTestUser("user@seed.user.com", "!Userexample123", "User", "Model", true, "USER");
} 
main();
export default main;

