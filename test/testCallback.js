//callback examples

function calculate (actionCallback, num1, num2){
    if (typeof num1 === 'number' && typeof num2 === 'number'){
        var result = actionCallback(num1, num2)
        return result
    }
}

function add (num1, num2){
    var result = num1 + num2
    return result
}

function subtract (num1, num2){
    return num1 - num2
}

function multiply (num1, num2){
    return num1 * num2
}

function divide (num1, num2){
    return num1 / num2
}
var addResult = calculate(add, 5, 6)
console.log(addResult)
console.log(calculate(subtract, 5, 6))
console.log(calculate(multiply, 10, 10))
console.log(calculate(divide, 5, 6))




