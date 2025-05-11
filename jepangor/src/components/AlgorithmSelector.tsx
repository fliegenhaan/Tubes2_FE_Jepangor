import { FaProjectDiagram, FaTree, FaExchangeAlt } from 'react-icons/fa';

interface AlgorithmSelectorProps {
  algorithm: "bfs" | "dfs" | "bidirectional";
  onAlgorithmChange: (algorithm: "bfs" | "dfs" | "bidirectional") => void;
}

export default function AlgorithmSelector({
  algorithm,
  onAlgorithmChange,
}: AlgorithmSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Algoritma Pencarian
      </label>
      <div className="flex space-x-2">
        <AlgorithmButton 
          active={algorithm === "bfs"}
          onClick={() => onAlgorithmChange("bfs")}
          icon={<FaProjectDiagram />}
          name="BFS"
          description="Breadth-First Search"
        />
        <AlgorithmButton 
          active={algorithm === "dfs"}
          onClick={() => onAlgorithmChange("dfs")}
          icon={<FaTree />}
          name="DFS"
          description="Depth-First Search"
        />
        <AlgorithmButton 
          active={algorithm === "bidirectional"}
          onClick={() => onAlgorithmChange("bidirectional")}
          icon={<FaExchangeAlt />}
          name="Bidirectional"
          description="Pencarian Dua Arah"
        />
      </div>
    </div>
  );
}

interface AlgorithmButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  name: string;
  description: string;
}

function AlgorithmButton({ active, onClick, icon, name, description }: AlgorithmButtonProps) {
  return (
    <button
      className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg text-sm flex-1 transition-all duration-200 ${
        active
          ? "bg-[var(--primary)] text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
      onClick={onClick}
    >
      <div className="text-xl mb-1">{icon}</div>
      <div className="font-medium">{name}</div>
      <div className={`text-xs ${active ? 'text-white/80' : 'text-gray-500'}`}>{description}</div>
    </button>
  );
}