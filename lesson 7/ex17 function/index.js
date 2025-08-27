// function = A section of reusable code.
// Declare code once, use it whenever you want.
// Call the function to execute that code.

//What happens if we replace the function parameters order?

function happyBirthday(age, username) {
    console.log("Happy birthday to you!");
    console.log("Happy birthday to you!");
    console.log(`HAppy birthday dear ${username}!`);
    console.log("Happy birthday to you!");
    console.log(`You are ${{ age }} years old`)
}

happyBirthday("John Doe", 25);