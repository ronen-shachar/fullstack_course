// function = A section of reusable code.
// Declare code once, use it whenever you want.
// Call the function to execute that code.

function isValidEmail(email) {
    return email.includes("@") ? true : false;
}

console.log(isValidEmail("JohnDoe@gmail.com"));
