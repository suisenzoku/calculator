const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) return null;
    return a / b;
}

let current = "";
let first = "";
let second = "";
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

const updateDisplay = (text) => {
    const display = document.querySelector(".display");
    if (text) {
        display.textContent = text;
        return;
    }

    if (operator) {
        display.textContent = `${first} ${operator} ${current}`;
    } else {
        display.textContent = `${current}`;
    }
}

const init = () => {
    handleNumberClick();
}

init();