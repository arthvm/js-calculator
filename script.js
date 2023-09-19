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

const displayText = document.querySelector(".display-text");
let firstOperand,
  secondOperand,
  operator,
  displayValue,
  isOperating = false,
  hasReset = true;

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
    isOperating = false;
    Operate();
  }
  operator = currentOperator;
  isOperating = true;
  GetFirstOperand();
  ResetDisplay();
}

function OnEqualityButton() {
  if (firstOperand == null && secondOperand == null) {
    RepeatOperation();
  } else {
    Operate();
  }
}

function GetFirstOperand() {
  firstOperand = +displayValue;
}

function GetSecondOperand() {
  secondOperand = +displayValue;
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

  console.log(result);
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
