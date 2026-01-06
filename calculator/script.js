const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let firstValue = null;
let secondValue = null;
let currentOperator = null;
let resetAfterEquals = false;

//CALCULATION
function calculate(a, b, op) {
  a = parseFloat(a);
  b = b !== null ? parseFloat(b) : null;

  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b === 0 ? 'Cannot divide by 0' : a / b;
    case '%':
      return b === 0 ? 'Error' : a % b;
    case '^':
      return Math.pow(a, b);
    case '√':
      return a < 0 ? 'Error' : Math.sqrt(a);
    default:
      return 'Error';
  }
}

// DISPLAY
function updateDisplay() {
  let output = firstValue || '0';

  if (currentOperator) output += ` ${currentOperator} `;
  if (secondValue) output += secondValue;

  display.value = output;
}

//BUTTON HANDLING
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const number = button.dataset.num;
    const operator = button.dataset.op;

    /*  NUMBERS*/
    if (number !== undefined) {
      if (resetAfterEquals) {
        firstValue = number;
        resetAfterEquals = false;
      } else if (!currentOperator) {
        firstValue = firstValue === null ? number : firstValue + number;
      } else {
        secondValue = secondValue === null ? number : secondValue + number;
      }
      updateDisplay();
    }

    // OPERATORS
    if (button.classList.contains('operator')) {
      if (firstValue === null) return;

      // Square root
      if (operator === '√') {
        firstValue = calculate(firstValue, null, '√').toString();
        currentOperator = null;
        secondValue = null;
        updateDisplay();
        return;
      }

      // Chained calculations
      if (firstValue && currentOperator && secondValue) {
        firstValue = calculate(
          firstValue,
          secondValue,
          currentOperator
        ).toString();
        secondValue = null;
      }

      currentOperator = operator;
      resetAfterEquals = false;
      updateDisplay();
    }

    //EQUALS
    if (button.id === 'equals') {
      if (firstValue && currentOperator && secondValue) {
        const result = calculate(firstValue, secondValue, currentOperator);
        display.value = result;
        firstValue = result.toString();
        secondValue = null;
        currentOperator = null;
        resetAfterEquals = true;
      }
    }

    //CLEAR
    if (button.id === 'clear') {
      firstValue = null;
      secondValue = null;
      currentOperator = null;
      resetAfterEquals = false;
      display.value = '0';
    }
  });
});
