const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) return null;
    return a / b;
}

const operators = {
    "multiply": "x",
    "divide": "/",
    "add": "+",
    "subtract": "-"
}

let current = "";
let first = "";
let operator = "";

const operate = (operator, a, b) => {
    switch (operator) {
        case "add":
            return add(a, b);
        case "subtract":
            return subtract(a, b);
        case "multiply":
            return multiply(a, b);
        case "divide":
            return divide(a, b);
    }
}

const handleNumberClick = () => {
    const numbers = document.querySelectorAll(".number");
    numbers.forEach((button) => {
        button.addEventListener("click", (e) => {
            current += e.target.id;
            updateDisplay();
        })
    })
}

const handleOperatorClick = () => {
    const operators = document.querySelectorAll(".operator");
    operators.forEach((button) => {
        button.addEventListener("click", (e) => {
            if (operator) {
                return;
            }
            operator = e.target.id;
            switchValue();
            updateDisplay();
        })
    })
}

const switchValue = () => {
    first = current;
    current = "";
}

const updateDisplay = (text) => {
    const display = document.querySelector(".display");
    if (text) {
        display.textContent = text;
        return;
    }

    if (operator) {
        display.textContent = `${first} ${operators[operator]} ${current}`;
    } else {
        display.textContent = `${current}`;
    }
}

const init = () => {
    handleNumberClick();
    handleOperatorClick();
}

init();