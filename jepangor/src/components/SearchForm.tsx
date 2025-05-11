"use client"
import { useState } from "react";
import { SearchParams } from "../types";
import AlgorithmSelector from "./AlgorithmSelector";
import ElementSelector from "./ElementSelector";
import { FaSearch, FaPlusCircle, FaMinusCircle } from "react-icons/fa";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [targetElement, setTargetElement] = useState<string>("");
  const [algorithm, setAlgorithm] = useState<"bfs" | "dfs" | "bidirectional">("bfs");
  const [findShortest, setFindShortest] = useState<boolean>(true);
  const [maxRecipes, setMaxRecipes] = useState<number>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!targetElement) {
      alert("Silakan pilih elemen target");
      return;
    }
    
    onSearch({
      targetElement,
      algorithm,
      findShortest,
      maxRecipes: findShortest ? 1 : maxRecipes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 slide-up">
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[var(--primary)] mb-4">Cari Recipe</h3>
        
        <ElementSelector
          onSelect={setTargetElement}
          selectedElement={targetElement}
        />
        
        <AlgorithmSelector
          algorithm={algorithm}
          onAlgorithmChange={setAlgorithm}
        />
        
        <div className="w-full">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={findShortest}
              onChange={(e) => setFindShortest(e.target.checked)}
              className="h-4 w-4 rounded text-[var(--primary)] focus:ring-[var(--primary)]"
            />
            <span>Cari recipe terpendek</span>
          </label>
          
          <p className="mt-1 text-xs text-gray-500">
            {findShortest 
              ? "Hanya akan menampilkan 1 recipe dengan jalur terpendek" 
              : "Akan menampilkan beberapa recipe berbeda"}
          </p>
        </div>
        
        {!findShortest && (
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jumlah recipe maksimal
            </label>
            <div className="flex items-center">
              <button 
                type="button"
                onClick={() => setMaxRecipes(prev => Math.max(1, prev - 1))}
                className="p-2 bg-gray-100 rounded-l-lg text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <FaMinusCircle />
              </button>
              <input
                type="number"
                min="1"
                max="20"
                value={maxRecipes}
                onChange={(e) => setMaxRecipes(parseInt(e.target.value) || 1)}
                className="w-16 py-2 text-center border-y border-gray-300 focus:outline-none"
              />
              <button 
                type="button"
                onClick={() => setMaxRecipes(prev => Math.min(20, prev + 1))}
                className="p-2 bg-gray-100 rounded-r-lg text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <FaPlusCircle />
              </button>
            </div>
          </div>
        )}
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !targetElement}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center transition-all duration-200 ${
              isLoading || !targetElement
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[var(--primary)] hover:bg-[var(--primary-light)]"
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Mencari...</span>
              </>
            ) : (
              <>
                <span className="mr-2">
                  < FaSearch />
                </span>
                <span>Cari Recipe</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}