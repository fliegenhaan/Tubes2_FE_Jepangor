import { SearchResult } from "../types";

interface ResultInfoProps {
  result: SearchResult | null;
}

export default function ResultInfo({ result }: ResultInfoProps) {
  if (!result) return null;
  
  // Hitung jumlah recipe unik
  const uniqueRecipes = new Set();
  result.recipes.forEach(recipe => {
    const sortedIngredients = [...recipe.Ingredients].sort().join('-');
    uniqueRecipes.add(sortedIngredients);
  });
  
  const uniqueRecipeCount = uniqueRecipes.size;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Hasil Pencarian untuk "{result.targetElement}"
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Jumlah Recipe Unik</p>
          <p className="text-xl font-bold text-blue-600">{uniqueRecipeCount}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Node yang Dikunjungi</p>
          <p className="text-xl font-bold text-purple-600">{result.visitedNodes}</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-md">
        <p className="text-sm text-gray-500">Waktu Pencarian</p>
        <p className="text-xl font-bold text-green-600">
          {result.timeElapsed.toFixed(6)} detik
        </p>
      </div>
    </div>
  );
}