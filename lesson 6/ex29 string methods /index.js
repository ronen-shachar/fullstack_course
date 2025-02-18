// string slicing = creating a substring 
// from a portion of another string
// string.slice(start, end);

let email = "JohnDoe@gmail.com";

let username = email.slice(0, username.indexOf("@"));
let extension = username.slice(username.indexOf("@") + 1);

console.log(username);
console.log(extension);