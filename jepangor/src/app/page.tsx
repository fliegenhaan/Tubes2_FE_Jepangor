"use client"
import Head from "next/head";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SearchForm from "../components/SearchForm";
import ResultInfo from "../components/ResultInfo";
import RecipeTree from "../components/RecipeTree";
import useRecipeSearch from "../hooks/useRecipeSearch";
import { SearchParams } from "../types";

export default function Home() {
  const { result, isLoading, error, searchRecipes } = useRecipeSearch();

  const handleSearch = (params: SearchParams) => {
    searchRecipes(params);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Little Alchemy 2 Recipe Finder</title>
        <meta name="description" content="Find recipes in Little Alchemy 2 using BFS and DFS algorithms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>
          
          <div className="md:col-span-2 space-y-6">
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
                <p>{error}</p>
              </div>
            )}
            
            {result && <ResultInfo result={result} />}        
            {isLoading ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Sedang mencari recipe...</p>
              </div>
            ) : (
              result && result.recipes.length > 0 ? (
                <RecipeTree 
                  recipes={result.recipes} 
                  targetElement={result.targetElement} 
                />
              ) : (
                <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500">
                  {result ? "Tidak ditemukan recipe untuk elemen ini." : "Silahkan cari recipe untuk suatu elemen."}
                </div>
              )
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>Tugas Besar 2 IF2211 Strategi Algoritma - Jepangor</p>
          <p className="mt-2 text-[#8a2c2c] text-sm">
            © 2025 Teknik Informatika ITB
          </p>
        </div>
      </footer>
    </div>
  );
}