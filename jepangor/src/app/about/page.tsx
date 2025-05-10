import Head from "next/head";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>About - Little Alchemy 2 Recipe Finder</title>
        <meta name="description" content="About the Little Alchemy 2 Recipe Finder application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Tentang Aplikasi
          </h2>
          
          <p className="text-gray-700 mb-4">
            Aplikasi Little Alchemy 2 Recipe Finder adalah aplikasi untuk mencari recipe dalam permainan Little Alchemy 2 menggunakan algoritma Breadth-First Search (BFS) dan Depth-First Search (DFS).
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
            Algoritma BFS dan DFS
          </h3>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-800">Breadth-First Search (BFS)</h4>
            <p className="text-gray-700">
              BFS adalah algoritma pencarian graf yang mengeksplorasi semua node pada kedalaman yang sama sebelum melanjutkan ke node pada kedalaman berikutnya. Algoritma ini cocok untuk menemukan jalur terpendek dalam graf yang tidak berbobot.
            </p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-800">Depth-First Search (DFS)</h4>
            <p className="text-gray-700">
              DFS adalah algoritma pencarian graf yang mengeksplorasi jalur secara mendalam terlebih dahulu sebelum melakukan backtracking. Algoritma ini efisien dalam ruang memori namun tidak menjamin menemukan jalur terpendek.
            </p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-800">Bidirectional Search</h4>
            <p className="text-gray-700">
              Bidirectional Search adalah teknik pencarian yang menjalankan dua pencarian sekaligus: satu dari node awal dan satu dari node tujuan. Pencarian berhenti ketika kedua pencarian bertemu di tengah.
            </p>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
            Tim Pengembang
          </h3>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="font-medium">Jepangor Team</p>
            <p className="text-gray-600">Teknik Informatika ITB</p>
            <p className="text-gray-600">2025</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>Tugas Besar 2 IF2211 Strategi Algoritma - Jepangor</p>
          <p className="mt-2 text-gray-400 text-sm">
            © 2025 Teknik Informatika ITB
          </p>
        </div>
      </footer>
    </div>
  );
}