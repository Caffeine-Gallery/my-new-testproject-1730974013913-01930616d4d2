import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let loading = document.getElementById('loading');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

async function calculate() {
    try {
        const expression = display.value;
        const [num1, operator, num2] = expression.match(/(-?\d+\.?\d*)([\+\-\*\/])(-?\d+\.?\d*)/).slice(1);

        loading.classList.remove('d-none');

        let result;
        switch (operator) {
            case '+':
                result = await backend.add(parseFloat(num1), parseFloat(num2));
                break;
            case '-':
                result = await backend.subtract(parseFloat(num1), parseFloat(num2));
                break;
            case '*':
                result = await backend.multiply(parseFloat(num1), parseFloat(num2));
                break;
            case '/':
                result = await backend.divide(parseFloat(num1), parseFloat(num2));
                break;
        }

        display.value = result.toString();
    } catch (error) {
        display.value = 'Error';
        console.error('Calculation error:', error);
    } finally {
        loading.classList.add('d-none');
    }
}

window.appendToDisplay = appendToDisplay;
window.clearDisplay = clearDisplay;
window.calculate = calculate;
