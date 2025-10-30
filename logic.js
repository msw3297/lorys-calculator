function calculateFullPrice(originalPrice, budgetPrice, promotionPrice) {
  return originalPrice - budgetPrice - promotionPrice;
}

function calculateMonthlyRates(fullPrice) {
  return truncateToTwoDecimals(Math.max(fullPrice / 24, 0));
}

function calculateCashPrice(fullPrice) {
  return truncateToTwoDecimals(Math.max(fullPrice - 10, 0));
}

function truncateToTwoDecimals(num) {
  const truncated = Math.trunc(num * 100) / 100;
  return Number(truncated.toFixed(2));
}

function handleCalculateButtonClicked() {
  const originalPriceInput = document.getElementById("original-price-input");
  const budgetPriceInput = document.getElementById("budget-price-input");
  const promotionPriceInput = document.getElementById("promotion-price-input");

  const originalPrice = parseFloat(originalPriceInput.value.replace(",", "."));
  const budgetPrice = parseFloat(budgetPriceInput.value.replace(",", "."));
  const promotionPrice = parseFloat(promotionPriceInput.value.replace(",", "."));

  if (isNaN(originalPrice) || originalPrice === 0) {
    alert("Attention, silly Lorasian:\nYou forgot to add an original price value");
    return;
  }

  let fullPrice = calculateFullPrice(originalPrice, budgetPrice, promotionPrice);
  fullPrice = truncateToTwoDecimals(Math.max(fullPrice, 0));

  const cashPrice = calculateCashPrice(fullPrice);
  const monthlyRate = calculateMonthlyRates(fullPrice);

  const fullPriceText = document.getElementById("full-price-value");
  const cashPriceText = document.getElementById("cash-price-value");
  const monthlyRateText = document.getElementById("monthly-rate-value");

  fullPriceText.textContent = fullPrice.toString().replace(".", ",");
  cashPriceText.textContent = cashPrice.toString().replace(".", ",");
  monthlyRateText.textContent = monthlyRate.toString().replace(".", ",");
}

function handleClearButtonClicked() {
  const inputs = document.getElementsByClassName("input");
  const outputs = document.getElementsByClassName("output-value-text");

  Array.from(inputs).forEach(input => (input.value = "0"));
  Array.from(outputs).forEach(output => (output.textContent = "0"));
}

const calculateButton = document.getElementById("calculate-button");
const clearButton = document.getElementById("clear-button");

if (calculateButton && clearButton) {
  calculateButton.addEventListener("click", handleCalculateButtonClicked);
  clearButton.addEventListener("click", handleClearButtonClicked);
} else {
  console.error("Couldn't find elements");
}
