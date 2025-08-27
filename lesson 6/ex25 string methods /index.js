// string methods = allow us to manipulate and work with text(string)

let userName = "John Doe#";

let result = userName.includes("#");

if (result) {
    console.log("Your username can't include '#'")
}
else {
    console.log(result);
}