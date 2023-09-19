const operandBtns = document.querySelectorAll(".operand-btn");
operandBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    UpdateDisplay(e.target.dataset.num);
  });
});

const operatorBtns = document.querySelectorAll(".operator-btn");
operatorBtns.forEach((button) => {
  button.addEventListener("focus", (e) => {
    e.target.classList.toggle("active");
    OnOperatorFocus(e.target.dataset.operator);
  });
  button.addEventListener("focusout", (e) => {
    e.target.classList.toggle("active");
  });
});

const equalBtn = document.querySelector("[data-equal]");
equalBtn.addEventListener("click", () => {
  OnEqualityButton();
});

const clearBtn = document.querySelector("[data-clear]");
clearBtn.addEventListener("click", () => {
  OnClear();
});

const signalBtn = document.querySelector("[data-signal]");
signalBtn.addEventListener("click", () => {
  RevertSign();
});

const percentageBtn = document.querySelector("[data-percentage]");
percentageBtn.addEventListener("click", () => {
  Percentage();
});

const displayText = document.querySelector(".display-text");
let firstOperand,
  secondOperand,
  operator,
  displayValue = 0,
  isOperating = false,
  hasReset = true,
  mayHardClear = true;

let lastOperation = {
  operand: null,
  lastOperator: null,
};

function UpdateDisplay(newValue) {
  if (hasReset) {
    hasReset = false;
    displayValue = newValue;
    displayText.textContent = displayValue;
  } else {
    displayValue += newValue;
    displayText.textContent = displayValue;
  }
}

function OnOperatorFocus(currentOperator) {
  if (isOperating) {
    Operate();
  }
  operator = currentOperator;
  isOperating = true;
  GetFirstOperand();
  ResetDisplay();
}

function OnEqualityButton() {
  if (firstOperand == null && secondOperand == null && operator != null) {
    RepeatOperation();
  } else if (operator == null) {
    HardClear();
  } else {
    Operate();
  }
}

function GetFirstOperand() {
  firstOperand = +displayValue;
  mayHardClear = false;
}

function GetSecondOperand() {
  secondOperand = +displayValue;
}

function ClearDisplay() {
  displayValue = 0;
  UpdateDisplay(displayValue);
  hasReset = true;
}

function ResetDisplay() {
  displayValue = null;
  hasReset = true;
}

function ResetOperands() {
  firstOperand = null;
  secondOperand = null;
}

function Operate() {
  GetSecondOperand();
  let result;
  switch (operator) {
    case "add":
      result = Add(firstOperand, secondOperand);
      break;
    case "subtract":
      result = Subtract(firstOperand, secondOperand);
      break;
    case "multiply":
      result = Multiply(firstOperand, secondOperand);
      break;
    case "divide":
      result = Divide(firstOperand, secondOperand);
      break;
  }

  isOperating = false;
  SetLastOperation();
  ResetOperands();
  ResetDisplay();
  UpdateDisplay(result);
}

function SetLastOperation() {
  lastOperation["lastOperator"] = operator;
  lastOperation["operand"] = secondOperand;
}

function RepeatOperation() {
  let result;
  switch (lastOperation.lastOperator) {
    case "add":
      result = Add(displayValue, lastOperation.operand);
      break;
    case "subtract":
      result = Subtract(displayValue, lastOperation.operand);
      break;
    case "multiply":
      result = Multiply(displayValue, lastOperation.operand);
      break;
    case "divide":
      result = Divide(displayValue, lastOperation.operand);
      break;
  }

  ResetDisplay();
  UpdateDisplay(result);
}

function OnClear() {
  if (mayHardClear) {
    HardClear();
  } else {
    SoftClear();
  }
}

function SoftClear() {
  mayHardClear = true;
  ClearDisplay();
}

function HardClear() {
  ResetOperands();
  displayValue = null;
  isOperating = false;
  hasReset = true;
  mayHardClear = true;
  lastOperation["lastOperator"] = null;
  lastOperation["operand"] = null;
  displayText.textContent = 0;
}

function RevertSign() {
  displayValue = displayValue * -1;
  hasReset = true;
  UpdateDisplay(displayValue);
}

function Percentage() {
  displayValue = displayValue / 100;
  hasReset = true;
  UpdateDisplay(displayValue);
}

/***************************************************************MATH FUNCTIONS************************************************************/

function Add(num1, num2) {
  return num1 + num2;
}
function Subtract(num1, num2) {
  return num1 - num2;
}
function Multiply(num1, num2) {
  return num1 * num2;
}
function Divide(num1, num2) {
  if (num2 == 0) {
    return "Error";
  }
  return num1 / num2;
}
