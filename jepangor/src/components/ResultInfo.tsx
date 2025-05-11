import { SearchResult } from "../types";
import { FaInfoCircle, FaStopwatch, FaSitemap, FaFlask } from "react-icons/fa";

interface ResultInfoProps {
  result: SearchResult | null;
}

export default function ResultInfo({ result }: ResultInfoProps) {
  if (!result) return null;

  const recipes = result.recipes || [];

  return (
    <div className="card p-5 slide-up">
      <h3 className="flex items-center text-lg font-semibold text-[var(--primary)] mb-4">
        <span className="mr-2">
          < FaInfoCircle />
        </span>
        Hasil Pencarian untuk "{result.targetElement}"
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InfoCard 
          icon={<span className="text-[var(--primary)]"><FaFlask /></span>}
          label="Jumlah Recipe"
          value={recipes.length.toString()}
        />      
        <InfoCard 
          icon={<span className="text-[var(--secondary)]"><FaSitemap /></span>}
          label="Node yang Dikunjungi"
          value={result.visitedNodes.toLocaleString()}
        />
        
        <InfoCard 
          icon={<span className="text-[var(--secondary)]"><FaStopwatch /></span>}
          label="Waktu Pencarian"
          value={`${result.timeElapsed.toFixed(6)} detik`}
        />
      </div>
      
      <div className="mt-4 grid grid-cols-1 gap-3">
        {recipes.map((recipe, index) => (
          <div 
            key={index}
            className="bg-gray-50 p-3 rounded-lg border border-gray-200"
          >
            <p className="text-sm text-gray-500 mb-1">Recipe {index + 1}</p>
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.map((ingredient, i) => (
                <div 
                  key={i}
                  className="px-3 py-1 bg-white rounded-full border border-gray-200 text-sm font-medium"
                >
                  {ingredient}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm text-gray-500">{label}</p>
        <div className="text-xl">{icon}</div>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}