// How to accept user input

// 1. window prompt
// 2. HTML textBox

let username;

document.getElementById("mySubmit").onclick = function () {
    username = document.getElementById("myText").value;
    console.log(username);


    document.getElementById("myH1").textContent = `Hello ${username}`;
}