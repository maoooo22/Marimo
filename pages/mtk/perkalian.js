import { useState } from 'react';

export default function PerkalianPembagian() {
  const [angka1, setAngka1] = useState('');
  const [angka2, setAngka2] = useState('');
  const [hasil, setHasil] = useState(null);
  const [mode, setMode] = useState('perkalian');

  const hitung = () => {
    const a = parseFloat(angka1);
    const b = parseFloat(angka2);
    if (isNaN(a) || isNaN(b)) {
      setHasil('Masukkan angka valid');
      return;
    }
    setHasil(mode === 'perkalian' ? a * b : a / b);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-2xl font-bold mb-4">Perkalian & Pembagian</h1>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${mode === 'perkalian' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('perkalian')}
        >
          Perkalian
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === 'pembagian' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('pembagian')}
        >
          Pembagian
        </button>
      </div>
      <input
        type="number"
        placeholder="Angka pertama"
        value={angka1}
        onChange={(e) => setAngka1(e.target.value)}
        className="mb-2 px-4 py-2 border rounded w-64"
      />
      <input
        type="number"
        placeholder="Angka kedua"
        value={angka2}
        onChange={(e) => setAngka2(e.target.value)}
        className="mb-4 px-4 py-2 border rounded w-64"
      />
      <button onClick={hitung} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Hitung
      </button>
      {hasil !== null && (
        <div className="mt-4 text-xl font-semibold">Hasil: {hasil}</div>
      )}
    </div>
  );
          }
