// pages/mtk/index.js
import Link from 'next/link';

export default function MatematikaIndex() {
  const menu = [
    { title: 'Perkalian', href: '/mtk/perkalian' },
    { title: 'Pembagian', href: '/mtk/pembagian' },
    { title: 'Konversi Liter ke dm³', href: '/mtk/konversi-liter-dm' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Menu Matematika</h1>
      <div className="grid gap-4 w-full max-w-md">
        {menu.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="block text-center bg-white shadow-md hover:shadow-lg transition rounded-xl py-4 px-6 border hover:bg-blue-50"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
