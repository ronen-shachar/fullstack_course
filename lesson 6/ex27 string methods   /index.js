// string slicing = creating a substring 
// from a portion of another string
// string.slice(start, end);

let fullName = "John Doe";

let firstName = fullName.slice(0, 3);
let lastName = fullName.slice(5, 8);
// let lastName = fullName.slice(5);
// let firstChar = fullName.slice(0, 1);
// let lastChar = fullName.slice(-1);

console.log(firstName);
console.log(lastName);