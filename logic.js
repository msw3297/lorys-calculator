function calculateFullPrice(originalPrice, budgetPrice, promotionPrice) {
  return originalPrice - budgetPrice - promotionPrice;
}

function calculateMonthlyRates(fullPrice) {
  return(fullPrice / 24).toFixed(2);
}

function calculateCashPrice(fullPrice) {
  return fullPrice - 10;
}

function handleCalculateButtonClicked() {
  const originalPriceInput = document.getElementById("original-price-input");
  const budgetPriceInput = document.getElementById("budget-price-input");
  const promotionPriceInput = document.getElementById("promotion-price-input");

  const originalPrice = originalPriceInput.value;
  const budgetPrice = budgetPriceInput.value;
  const promotionPrice = promotionPriceInput.value;

  if (originalPrice == 0) {
    alert("Attention, silly Lorasian:\nYou forgot to add an original price value");
    return;
  }

  const fullPrice = calculateFullPrice(
    originalPrice,
    budgetPrice,
    promotionPrice
  );

  const cashPrice = calculateCashPrice(fullPrice);
  const monthlyRate = calculateMonthlyRates(fullPrice);

  const fullPriceText = document.getElementById("full-price-value");
  const cashPriceText = document.getElementById("cash-price-value");
  const monthlyRateText = document.getElementById("monthly-rate-value");

  fullPriceText.textContent = fullPrice;
  cashPriceText.textContent = cashPrice;
  monthlyRateText.textContent = monthlyRate;
}

function handleClearButtonClicked() {
  const inputs = document.getElementsByClassName("input");
  const outputs = document.getElementsByClassName("output-value-text");

  Array.from(inputs).forEach(input => input.value = "0");
  Array.from(outputs).forEach(output => output.textContent = "0");
}

const calculateButton = document.getElementById("calculate-button");
const clearButton = document.getElementById("clear-button");

if (calculateButton && clearButton) {
  calculateButton.addEventListener(
    "click",
    () => handleCalculateButtonClicked()
  );

  clearButton.addEventListener(
    "click",
    () => handleClearButtonClicked()
  );
} else {
  console.error("Couldn't find elements");
}
