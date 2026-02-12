class Calculator {
    constructor(previousText, currentText) {
        this.previousText = previousText;
        this.currentText = currentText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand += number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;

        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current !== 0 ? prev / current : "Error";
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentText.innerText =
            this.currentOperand === '' ? '0' : this.currentOperand;

        if (this.operation != null) {
            this.previousText.innerText =
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousText.innerText = '';
        }
    }
}

const previousText = document.getElementById('previous');
const currentText = document.getElementById('current');
const calculator = new Calculator(previousText, currentText);

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        if (!isNaN(value) || value === '.') {
            calculator.appendNumber(value);
        } 
        else if (value === 'AC') {
            calculator.clear();
        } 
        else if (value === 'DEL') {
            calculator.delete();
        } 
        else if (value === '=') {
            calculator.compute();
        } 
        else {
            calculator.chooseOperation(value);
        }

        calculator.updateDisplay();
    });
});

/* Keyboard Support */
document.addEventListener("keydown", (event) => {
    if (!isNaN(event.key) || event.key === '.') {
        calculator.appendNumber(event.key);
    } 
    else if (['+', '-', '*', '/', '%'].includes(event.key)) {
        calculator.chooseOperation(event.key);
    } 
    else if (event.key === 'Enter') {
        calculator.compute();
    } 
    else if (event.key === 'Backspace') {
        calculator.delete();
    } 
    else if (event.key === 'Escape') {
        calculator.clear();
    }

    calculator.updateDisplay();
});
