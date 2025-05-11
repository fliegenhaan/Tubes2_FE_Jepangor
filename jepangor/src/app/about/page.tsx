"use client"
import { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { FaCode, FaSearch, FaProjectDiagram, FaTree, FaExchangeAlt, FaLightbulb, FaUsers } from "react-icons/fa";

export default function About() {
  const [activeTab, setActiveTab] = useState<'algorithms' | 'team' | 'app'>('algorithms');

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Head>
        <title>Tentang - Little Alchemy 2 Recipe Finder</title>
        <meta name="description" content="Tentang aplikasi Little Alchemy 2 Recipe Finder" />
      </Head>

      <NavBar />
      <Header />

      <main className="container mx-auto px-4 py-10">
        <div className="card p-0 overflow-hidden slide-up">
          <div className="flex border-b border-gray-200">
            <TabButton 
              active={activeTab === 'algorithms'}
              onClick={() => setActiveTab('algorithms')}
              icon={<FaCode />}
              label="Algoritma"
            />
            <TabButton 
              active={activeTab === 'app'}
              onClick={() => setActiveTab('app')}
              icon={<FaLightbulb />}
              label="Aplikasi"
            />
            <TabButton 
              active={activeTab === 'team'}
              onClick={() => setActiveTab('team')}
              icon={<FaUsers />}
              label="Tim"
            />
          </div>
          
          <div className="p-6">
            {activeTab === 'algorithms' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
                  Algoritma BFS dan DFS
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AlgorithmCard 
                    title="Breadth-First Search (BFS)"
                    description="Algoritma pencarian graf yang mengeksplorasi semua node pada kedalaman yang sama sebelum melanjutkan ke node pada kedalaman berikutnya. Algoritma ini cocok untuk menemukan jalur terpendek dalam graf yang tidak berbobot."
                    icon={<span className="text-4xl text-[var(--primary)]"> < FaProjectDiagram /> </span>}
                    properties={[
                      "Menjamin jalur terpendek",
                      "Membutuhkan lebih banyak memori",
                      "Eksplorasi level demi level",
                      "Implementasi dengan antrian (FIFO)"
                    ]}
                  />
                  
                  <AlgorithmCard 
                    title="Depth-First Search (DFS)"
                    description="Algoritma pencarian graf yang mengeksplorasi jalur secara mendalam terlebih dahulu sebelum melakukan backtracking. Algoritma ini efisien dalam ruang memori namun tidak menjamin menemukan jalur terpendek."
                    icon={<span className="text-4xl text-[var(--secondary)]"> < FaTree /> </span>}
                    properties={[
                      "Eksplorasi mendalam terlebih dahulu",
                      "Efisien dalam penggunaan memori",
                      "Backtracking untuk alternatif jalur",
                      "Implementasi dengan stack (LIFO)"
                    ]}
                  />
                </div>
                
                <div className="mt-6">
                  <AlgorithmCard 
                    title="Bidirectional Search"
                    description="Teknik pencarian yang menjalankan dua pencarian sekaligus: satu dari node awal dan satu dari node tujuan. Pencarian berhenti ketika kedua pencarian bertemu di tengah. Ini dapat mengurangi jumlah node yang perlu dieksplorasi."
                    icon={<span className="text-4xl text-[var(--info)]"> < FaExchangeAlt /> </span>}
                    properties={[
                      "Pencarian dari dua arah sekaligus",
                      "Mempertemukan dua frontier search",
                      "Potensial mengurangi jumlah node yang dieksplorasi",
                      "Kompleksitas ruang yang lebih besar"
                    ]}
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'app' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
                  Tentang Aplikasi
                </h2>
                
                <p className="text-gray-700">
                  Aplikasi Little Alchemy 2 Recipe Finder adalah implementasi dari algoritma BFS dan DFS untuk mencari recipe dalam permainan Little Alchemy 2. Aplikasi ini dikembangkan sebagai Tugas Besar mata kuliah IF2211 Strategi Algoritma Teknik Informatika ITB.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-lg font-semibold mb-3">Fitur Utama</h3>
                  <ul className="space-y-3">
                    <FeatureItem 
                      icon={<span className="text-[var(--primary)]"> < FaSearch /> </span>}
                      title="Pencarian Recipe"
                      description="Cari recipe untuk membuat elemen tertentu dari elemen dasar menggunakan algoritma BFS, DFS, dan Bidirectional Search."
                    />
                    <FeatureItem 
                      icon={<span className="text-[var(--secondary)]"> < FaProjectDiagram /> </span>}
                      title="Visualisasi Tree"
                      description="Tampilkan visualisasi tree untuk recipe yang ditemukan, menunjukkan kombinasi elemen yang diperlukan."
                    />
                    <FeatureItem 
                      icon={<span className="text-[var(--info)]"> < FaTree /> </span>}
                      title="Multiple Recipe"
                      description="Temukan beberapa recipe berbeda untuk membuat elemen yang sama."
                    />
                  </ul>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-semibold mb-3">Teknologi</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <TechItem name="Next.js" />
                    <TechItem name="React" />
                    <TechItem name="TypeScript" />
                    <TechItem name="Tailwind CSS" />
                    <TechItem name="Go" />
                    <TechItem name="Gin" />
                    <TechItem name="D3.js" />
                    <TechItem name="Docker" />
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'team' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
                  Tim Pengembang
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <TeamMemberCard 
                    name="Muhammad Raihaan Perdana"
                    nim="13523124"
                    role="FullStack & Algorithm Developer"
                  />
                  <TeamMemberCard 
                    name="Ardell Aghna Mahendra"
                    nim="13523151"
                    role="UI/UX & Frontend Developer"
                  />
                  <TeamMemberCard 
                    name="Farrel Jabaar Altafataza"
                    nim="10122057"
                    role="Scraper & Algorithm Developer"
                  />
                </div>
                
                <div className="mt-8 p-5 bg-[var(--primary-light)]/10 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">Jepangor Team</h3>
                  <p className="text-gray-600">Teknik Informatika ITB</p>
                  <p className="text-gray-600">2025</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-[var(--primary)] text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>Tugas Besar 2 IF2211 Strategi Algoritma - Jepangor</p>
          <p className="mt-2 text-white/70 text-sm">
            © 2025 Teknik Informatika ITB
          </p>
        </div>
      </footer>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center py-3 px-4 text-sm font-medium transition-colors duration-200 ${
        active 
          ? "text-[var(--primary)] border-b-2 border-[var(--primary)]" 
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
      }`}
    >
      <span className="mr-2">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

interface AlgorithmCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  properties: string[];
}

function AlgorithmCard({ title, description, icon, properties }: AlgorithmCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-5 border border-gray-100">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-3">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="bg-gray-50 p-3 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-2">Karakteristik:</h4>
        <ul className="space-y-1">
          {properties.map((prop, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="text-[var(--primary)] mr-2">•</span>
              <span className="text-gray-600">{prop}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <li className="flex">
      <div className="flex-shrink-0 mr-3 mt-1">{icon}</div>
      <div>
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </li>
  );
}

function TechItem({ name }: { name: string }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-700">
      {name}
    </div>
  );
}

interface TeamMemberCardProps {
  name: string;
  nim: string;
  role: string;
}

function TeamMemberCard({ name, nim, role }: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-5 border border-gray-100 text-center">
      <div className="w-16 h-16 bg-[var(--primary-light)]/20 rounded-full flex items-center justify-center mx-auto mb-3">
        <span className="text-[var(--primary)] text-xl">
          < FaUsers />
        </span>
      </div>
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-gray-500 text-sm mb-2">{nim}</p>
      <div className="bg-[var(--primary-light)]/10 text-[var(--primary)] text-xs font-medium px-3 py-1 rounded-full inline-block">
        {role}
      </div>
    </div>
  );
}