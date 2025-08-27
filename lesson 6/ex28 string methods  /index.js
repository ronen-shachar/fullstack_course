// string slicing = creating a substring 
// from a portion of another string
// string.slice(start, end);

let fullName = "John Doe";

let firstName = fullName.slice(0, fullName.indexOf(" "));
let lastName = fullName.slice(fullName.indexOf(" ") + 1);

console.log(firstName);
console.log(lastName);