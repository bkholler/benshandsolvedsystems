const rows = document.querySelector('#rows');
const cols = document.querySelector('#cols');
const density = document.querySelector('#density');
const densityLabel = document.querySelector('#densityLabel');
const method = document.querySelector('#method');
const medium = document.querySelector('#medium');
const price = document.querySelector('#price');
const year = document.querySelector('#year');
const thanks = document.querySelector('#thanks');

year.textContent = new Date().getFullYear();

function pounds(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0
  }).format(value);
}

function calculate() {
  const r = Math.max(1, Number(rows.value) || 1);
  const c = Math.max(1, Number(cols.value) || 1);
  const d = Math.max(5, Number(density.value) || 5);
  const methodMultiplier = Number(method.value);
  const mediumMultiplier = Number(medium.value);

  const sizeFee = Math.pow(r * c, 0.92) * 3.2;
  const base = 18;
  const sparsityDiscount = Math.max(0, (100 - d) / 100) * 0.36;
  const total = (base + sizeFee) * methodMultiplier * mediumMultiplier * (1 - sparsityDiscount);

  densityLabel.textContent = `${d}%`;
  price.textContent = pounds(Math.max(12, Math.round(total / 2) * 2));
}

function showThanks() {
  thanks.textContent = 'Request received in spirit. Connect this form to a backend before accepting actual matrices.';
}

[rows, cols, density, method, medium].forEach((input) => {
  input.addEventListener('input', calculate);
  input.addEventListener('change', calculate);
});

calculate();
