"use client"
import { useState, useEffect } from "react";
import { SearchParams } from "../types";
import AlgorithmSelector from "./AlgorithmSelector";
import ElementSelector from "./ElementSelector";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [targetElement, setTargetElement] = useState<string>("");
  const [algorithm, setAlgorithm] = useState<"bfs" | "dfs" | "bidirectional">("bfs");
  const [findShortest, setFindShortest] = useState<boolean>(true);
  const [maxRecipes, setMaxRecipes] = useState<number>(5);
  
  useEffect(() => {
    if (maxRecipes < 1) setMaxRecipes(1);
    if (maxRecipes > 20) setMaxRecipes(20);
  }, [maxRecipes]);

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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        <ElementSelector
          onSelect={setTargetElement}
          selectedElement={targetElement}
        />
        
        <AlgorithmSelector
          algorithm={algorithm}
          onAlgorithmChange={setAlgorithm}
        />
        
        <div className="w-full">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={findShortest}
              onChange={(e) => setFindShortest(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Cari recipe terpendek</span>
          </label>
        </div>
        
        {!findShortest && (
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah recipe maksimal
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={maxRecipes}
              onChange={(e) => setMaxRecipes(parseInt(e.target.value) || 1)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              *Menampilkan maksimal {maxRecipes} recipe yang tersedia
            </p>
          </div>
        )}
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !targetElement}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isLoading || !targetElement
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Mencari..." : "Cari Recipe"}
          </button>
        </div>
      </div>
    </form>
  );
}