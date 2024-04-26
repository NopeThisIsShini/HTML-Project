/* Crate a faulty calculator using javaScript
 This faulty calculator dows followings:
 1. It takes two numbers as input from the user
 2. It performs wrong operations as follows:

 + ---> -
 * ---> +
 - ---> /
 / ---> **
It performs wrong operation 10% of the times

*/
let random = Math.random()
let a = prompt("Enter first number")
let c = prompt("Enter operation")
let b = prompt("Enter second number")


let obj = {
    "+": "-",
    "*": "+",
    "-": "/",
    "/": "**",

}

if (random > 0.1){
    // perform right calculation
    console.log(`The result is ${a} ${c} ${b}`)
    alert(`The result is  ${eval(`${a} ${c} ${b}`)}`)
}
else{
    // perform wrong calculation
    c = obj[c]
    alert(`The result is  ${eval(`${a} ${c} ${b}`)}`)
}
