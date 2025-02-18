// switch = can be an efficient replacement to many else if statements

let day = 1;

switch (day) {
    case 1:
        console.log("It is Monday")
    case 2:
        console.log("It is Tuesday")
    case 3:
        console.log("It is Wednesday")
    case 4:
        console.log("It is Thursday")
    case 5:
        console.log("It is Friday")
    case 6:
        console.log("It is Saturday")
    case 7:
        console.log("It is Sunday")
    default:
        console.log(`${day} is not a day`)
}
