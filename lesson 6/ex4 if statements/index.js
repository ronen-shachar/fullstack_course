// IF STATEMENTS = if a condition is true, execute some code
// if not, do something else


let age = 101;


if (age >= 100) {
    console.log("You are TOO OLD to enter this site");
}
else if (age === 0) {
    console.log("You can't enter. You were just born.");
}
else if (age >= 18) {
    console.log("You are old enough to enter this site");
}
else if (age < 0) {
    console.log("Your age can't be below 0");
}
else {
    console.log("You must be 18+ to enter this site");
}
