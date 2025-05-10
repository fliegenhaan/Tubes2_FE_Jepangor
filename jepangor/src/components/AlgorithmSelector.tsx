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
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Algoritma Pencarian
      </label>
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            algorithm === "bfs"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => onAlgorithmChange("bfs")}
        >
          BFS
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            algorithm === "dfs"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => onAlgorithmChange("dfs")}
        >
          DFS
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            algorithm === "bidirectional"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => onAlgorithmChange("bidirectional")}
        >
          Bidirectional
        </button>
      </div>
    </div>
  );
}