function hitungPerkalian() {
  const a = parseFloat(document.getElementById('perkalianA').value);
  const b = parseFloat(document.getElementById('perkalianB').value);
  const hasil = a * b;
  document.getElementById('hasilPerkalian').textContent = hasil;
}

function hitungPembagian() {
  const a = parseFloat(document.getElementById('pembagianA').value);
  const b = parseFloat(document.getElementById('pembagianB').value);
  if (b === 0) {
    document.getElementById('hasilPembagian').textContent = 'Tidak bisa dibagi 0';
  } else {
    const hasil = a / b;
    document.getElementById('hasilPembagian').textContent = hasil;
  }
}
