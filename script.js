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
            if (operator || !current) {
                return;
            }
            operator = e.target.id;
            switchValue();
            updateDisplay();
        })
    })
}

const handleEqualsClick = () => {
    const equals = document.querySelector(".equals");
    equals.addEventListener('click', (e) => {
        if (!operator || !current) {
            return;
        }
        const result = evualuateStrings(operator, first, current);
        if (result) {
            updateCalculator(result);
            updateDisplay();
        } else {
            clear();
            updateDisplay("Invalid operation");
        }
    });
}

const evualuateStrings = (operator, a, b) => {
    const firstValue = Number(a);
    const secondValue = Number(b);
    if (isNaN(firstValue) || isNaN(secondValue)) {
        return null;
    }
    return operate(operator, firstValue, secondValue);
}

const clear = () => {
    first = "";
    current = "";
    opreator = "";
}

const updateCalculator = (result) => {
    first = result;
    current = "";
    operator = "";
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

    if (first) {
        display.textContent = `${first} ${operators[operator] ? operators[operator] : ""} ${current}`;
    } else {
        display.textContent = `${current}`;
    }
}

const init = () => {
    handleNumberClick();
    handleOperatorClick();
    handleEqualsClick();
}

init();