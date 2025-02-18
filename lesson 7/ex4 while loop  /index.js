// while loop = repeat some code WHILE some condition is true

let username;

do {
    username = window.prompt("Enter your name")
} while (username === "" || username === null)

console.log(`Hello ${username}`)
