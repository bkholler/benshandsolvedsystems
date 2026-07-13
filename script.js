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

function showThanks(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const name = formData.get('name')?.trim() || 'Not provided';
  const email = formData.get('email')?.trim() || 'Not provided';
  const size = formData.get('size')?.trim() || 'Not specified';
  const selectedPackage = formData.get('package') || 'Not specified';
  const notes = formData.get('notes')?.trim() || 'No additional notes';

  const subject = `Hand-Solved Linear System Request from ${name}`;

  const body = [
    `Hello Ben's Hand-Solved Linear Systems,`,
    ``,
    `I would like to request an artisanal hand-solved linear system.`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `System size: ${size}`,
    `Desired package: ${selectedPackage}`,
    ``,
    `Notes for the mathematician:`,
    notes,
    ``,
    `I will attach or paste the linear system before sending this email.`,
    ``,
    `Please let me know the estimated price and turnaround time.`,
  ].join('\n');

  const mailtoUrl =
    `mailto:benshandsolvedsystems@proton.me` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  thanks.textContent =
    'Opening your email app. Please attach or paste your matrix before sending.';

  window.location.href = mailtoUrl;
}

[rows, cols, density, method, medium].forEach((input) => {
  input.addEventListener('input', calculate);
  input.addEventListener('change', calculate);
});

calculate();
