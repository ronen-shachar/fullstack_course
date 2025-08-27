// string methods = allow us to manipulate and work with text(string)

let userName = " John Doe";

let result = userName.startsWith(" ");
// let result = userName.endsWith(" ");

if (result) {
    console.log("Your username can't begin with ' '")
}
else {
    console.log(result);
}