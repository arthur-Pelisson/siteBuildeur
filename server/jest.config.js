// "**/maintenance.test.ts"
module.exports = {
    testMatch: ["**/auth.test.ts","**/post.test.ts", "**/user.test.ts", "**/tag.test.ts"],
    preset: 'ts-jest',
    verbose: true, // Ensure verbose is set to false
    silent: true,  // Add this line
    testEnvironment: 'node',
    displayName: {
        name: 'SERVER',
        color: 'blue',
      },
  };