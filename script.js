let firstOperand, secondOperand, operator;

function Operate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "add":
      Add(firstOperand, secondOperand);
      break;
    case "subtract":
      Subtract(firstOperand, secondOperand);
      break;
    case "multiply":
      Multiply(firstOperand, secondOperand);
      break;
    case "divide":
      Divide(firstOperand, secondOperand);
      break;
  }
}

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
  return num1 / num2;
}
