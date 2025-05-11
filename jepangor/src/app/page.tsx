"use client"
import { useState } from "react";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import SearchForm from "@/components/SearchForm";
import ResultInfo from "@/components/ResultInfo";
import RecipeTree from "@/components/RecipeTree";
import useRecipeSearch from "@/hooks/useRecipeSearch";
import { SearchParams } from "@/types";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const { result, isLoading, error, searchRecipes } = useRecipeSearch();
  const [showDebug, setShowDebug] = useState<boolean>(false);

  const handleSearch = (params: SearchParams) => {
    searchRecipes(params);
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <NavBar />
      <Header />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            
            <div className="card p-4">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Tips Pencarian</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-[var(--primary)] mr-2">•</span>
                  <span>BFS cocok untuk menemukan jalur terpendek</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] mr-2">•</span>
                  <span>DFS mengutamakan eksplorasi mendalam terlebih dahulu</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] mr-2">•</span>
                  <span>Bidirectional Search menggabungkan pencarian dari dua arah</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-[var(--error)] p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-[var(--error)]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {result && <ResultInfo result={result} />}
            
            {result && (
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowDebug(!showDebug)}
                  className="text-xs text-gray-500 underline"
                >
                  {showDebug ? "Sembunyikan" : "Tampilkan"} Data Debug
                </button>
              </div>
            )}
            
            {result && showDebug && (
              <div className="bg-gray-50 p-4 rounded-md mb-4 text-xs overflow-auto max-h-60 font-mono">
                <h3 className="font-bold mb-2 text-gray-700">Debug - Raw API Response:</h3>
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
            
            {isLoading ? (
              <div className="card p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mb-4"></div>
                  <p className="text-gray-600">Sedang mencari recipe...</p>
                  <p className="text-gray-400 text-sm mt-1">Mohon tunggu sebentar</p>
                </div>
              </div>
            ) : (
              <RecipeTree 
                recipes={result?.recipes || []} 
                targetElement={result?.targetElement || ""} 
              />
            )}
          </div>
        </div>
      </div>

      <footer className="bg-[var(--primary)] text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold mb-2">Little Alchemy 2 Recipe Finder</h3>
              <p className="text-white/80">
                Tugas Besar 2 IF2211 Strategi Algoritma - Jepangor
              </p>
            </div>
            
            <div className="flex items-center">
              <a 
                href="https://github.com/fliegenhaan/Tubes2_BE_Jepangor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white flex items-center mr-4"
              >
                <span className="mr-1">
                  < FaGithub />
                </span>
                <span>Backend</span>
              </a>
              
              <a 
                href="https://github.com/fliegenhaan/Tubes2_FE_Jepangor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white flex items-center"
              >
                <span className="mr-1">
                  < FaGithub />
                </span>
                <span>Frontend</span>
              </a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/20 text-center text-white/60 text-sm">
            © 2025 Teknik Informatika ITB
          </div>
        </div>
      </footer>
    </main>
  );
}