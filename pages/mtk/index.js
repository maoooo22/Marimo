import Link from "next/link";

export default function MtkMenuPage() {
  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Menu Matematika</h1>
      <ul style={styles.menu}>
        <li><Link href="/mtk/perkalian">Perkalian</Link></li>
        <li><Link href="/mtk/penjumlahan">Penjumlahan</Link></li>
        <li><Link href="/mtk/pengurangan">Pengurangan</Link></li>
        <li><Link href="/mtk/pembagian">Pembagian</Link></li>
      </ul>
    </main>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
  }
};
