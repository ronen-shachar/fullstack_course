// variable scope = where a variable is recognized
// and accessible (local vs global)

let x = 3;

function2();

function function1() {
    console.log(x);
}

function function2() {
    console.log(x);
}