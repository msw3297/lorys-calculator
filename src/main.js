import currency from "currency.js";

function formatInputString(input) {
  input = input.replace(".", "");
  input = input.replace(",", ".");
  input = input.replace("€", "");

  const regex = new RegExp('^-?\\d+(?:\.\\d{0,' + (2 || -1) + '})?');
  input = input.match(regex)[0];

  return parseFloat(input).toFixed(2);
}

function calculateFullPrice(originalPrice, budgetPrice, promotionPrice) {
  if (originalPrice <= 0) {
    console.error("Original price must be greater than 0");
    return 0;
  } else if (budgetPrice < 0 || promotionPrice < 0) {
    console.error("Input values cannot be less than 0");
    return 0;
  }

  const result = originalPrice.subtract(budgetPrice).subtract(promotionPrice);

  if (result < 0) {
    console.error("Result cannot be less than 0");
    return 0;
  } else {
    return result;
  }
}

function calculate24MonthlyRates(fullPrice) {
  return fullPrice.divide(24);
}

function calculateCashPayment(fullPrice) {
  const result = fullPrice.subtract(10);

  if (result < 0) {
    console.error("Result cannot be less than 0");
    return 0;
  } else {
    return result;
  }
}

function calculate() {
  const originalPrice = currency(formatInputString(document.getElementById("original-price-input").value));
  const budgetPrice = currency(formatInputString(document.getElementById("budget-price-input").value));
  const promotionPrice = currency(formatInputString(document.getElementById("promotion-price-input").value));

  const EURO = value => currency(value, {symbol: "€", decimal: ",", separator: "."});

  const fullPrice = EURO(calculateFullPrice(originalPrice, budgetPrice, promotionPrice));
  const cashPayment = EURO(calculateCashPayment(fullPrice));
  const monthlyRates = EURO(calculate24MonthlyRates(fullPrice));

  document.getElementById("full-price-value").value = fullPrice.format();
  document.getElementById("cash-price-value").value = cashPayment.format();
  document.getElementById("monthly-rate-value").value = monthlyRates.format();
}

function clear() {
  const inputs = document.getElementsByClassName("input");
  const outputs = document.getElementsByClassName("output-value");

  Array.from(inputs).forEach(input => (input.value = "0"));
  Array.from(outputs).forEach(output => (output.value = "0"));
}

function addListeners() {
  const calculateButton = document.getElementById("calculate-button");
  const clearButton = document.getElementById("clear-button");

  if (calculateButton && clearButton) {
    calculateButton.addEventListener("click", calculate);
    clearButton.addEventListener("click", clear);
  } else {
    console.error("Couldn't find elements");
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      calculate();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      clear();
    }
  });
}

addListeners();