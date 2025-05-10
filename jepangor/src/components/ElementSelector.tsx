import { useEffect, useState } from "react";
import { getAllElements } from "../utils/api";

interface ElementSelectorProps {
  onSelect: (element: string) => void;
  selectedElement: string;
}

export default function ElementSelector({ onSelect, selectedElement }: ElementSelectorProps) {
  const [elements, setElements] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchElements = async () => {
      const elementsList = await getAllElements();
      setElements(elementsList);
      setLoading(false);
    };

    fetchElements();
  }, []);

  const filteredElements = elements.filter(element =>
    element.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Target Element
      </label>
      <div className="relative">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search elements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <div className="mt-2 p-2 text-center text-gray-500">
            Loading elements...
          </div>
        ) : (
          <div className="mt-2 max-h-60 overflow-y-auto border border-gray-200 rounded-md">
            {filteredElements.length > 0 ? (
              filteredElements.map((element) => (
                <div
                  key={element}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    selectedElement === element ? "bg-blue-100" : ""
                  }`}
                  onClick={() => {
                    onSelect(element);
                    setSearchTerm("");
                  }}
                >
                  {element}
                </div>
              ))
            ) : (
              <div className="p-2 text-center text-gray-500">
                No elements found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}