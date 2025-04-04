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

let previous = "";
let current = "";
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

const swap = () => {
    previous = current;
    current = "";
}

const handleOperatorClick = () => {
    const operators = document.querySelectorAll(".operator");
    operators.forEach((button) => {
        button.addEventListener("click", (e) => {
            if (previous && current) {
                const equals = document.querySelector(".equals");
                equals.click();
            } else if (!previous) {
                operator = e.target.id;
                swap();
                updateDisplay();
            }
        })
    })
}

const handleEqualsClick = () => {
    const equals = document.querySelector(".equals");
    equals.addEventListener('click', (e) => {
        if (!operator || !current) {
            return;
        }
        const result = evualuateStrings(operator, previous, current);
        if (result !== null) {
            clear();
            current = round(result);
            updateDisplay();
        } else {
            updateDisplay("Invalid operation");
            clear();
        }
    });
}

const round = (value) => {
    return Math.round(value * 1000) / 1000;
}

const evualuateStrings = (operator, a, b) => {
    const firstValue = Number(a);
    const secondValue = Number(b);
    if (isNaN(firstValue) || isNaN(secondValue)) {
        return null;
    }
    return operate(operator, firstValue, secondValue);
}



const updateDisplay = (text) => {
    const display = document.querySelector(".display");
    if (text) {
        display.textContent = text;
        return;
    }

    if (operator) {
        const symbol = operators[operator] ? operators[operator] : "";
        display.textContent = `${previous} ${symbol} ${current}`;
    } else {
        display.textContent = `${current}`;
    }
}

const handleDotClick = () => {
    const dot = document.querySelector(".dot");
    dot.addEventListener("click", (e) => {
        if (current && !current.includes(".")) {
            current += ".";
            updateDisplay();
        }
    })
}

const clear = () => {
    previous = "";
    current = "";
    operator = "";
}

const handleClearClick = () => {
    const clearButton = document.querySelector("#clear");
    clearButton.addEventListener('click', (e) => {
        clear();
        updateDisplay("0");
    })
}

const init = () => {
    handleNumberClick();
    handleOperatorClick();
    handleEqualsClick();
    handleDotClick();
    handleClearClick();
}

init();