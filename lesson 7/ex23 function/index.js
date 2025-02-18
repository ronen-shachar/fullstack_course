// function = A section of reusable code.
// Declare code once, use it whenever you want.
// Call the function to execute that code.

function isValidEmail(email) {

    if (email.includes("@")) {
        return true
    }
    else {
        return false;
    }
}

console.log(isValidEmail("JohnDoe@gmail.com"));
// console.log(isValidEmail("ElonMuskgmail.com"));
