// function = A section of reusable code.
// Declare code once, use it whenever you want.
// Call the function to execute that code.

function isEven(number) {
    if (number % 2 === 0) {
        return true;
    }
    else {
        return false;
    }
}

console.log(isEven(5));
