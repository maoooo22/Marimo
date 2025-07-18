document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("mathForm");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
    const operasi = document.querySelector('input[name="operasi"]:checked').value;

    let hasil;

    if (isNaN(angka1) || isNaN(angka2)) {
      hasil = "Input tidak valid!";
    } else {
      if (operasi === "perkalian") {
        hasil = angka1 * angka2;
      } else if (operasi === "pembagian") {
        if (angka2 === 0) {
          hasil = "Tidak bisa dibagi dengan nol!";
        } else {
          hasil = angka1 / angka2;
        }
      } else {
        hasil = "Operasi tidak dikenali.";
      }
    }

    resultDiv.textContent = "Hasil: " + hasil;
  });
});
