import { useEffect, useState, useRef } from "react";
import { getAllElements } from "../utils/api";
import { FaSearch, FaHistory } from "react-icons/fa";

interface ElementSelectorProps {
  onSelect: (element: string) => void;
  selectedElement: string;
}

export default function ElementSelector({ onSelect, selectedElement }: ElementSelectorProps) {
  const [elements, setElements] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const elementsList = await getAllElements();
        setElements(elementsList);
      } catch (error) {
        console.error("Failed to fetch elements:", error);
      } finally {
        setLoading(false);
      }
    };

    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    fetchElements();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredElements = elements.filter(element =>
    element.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectElement = (element: string) => {
    onSelect(element);
    setSearchTerm(element);
    setIsDropdownOpen(false);
    
    const newRecentSearches = [
      element,
      ...recentSearches.filter(e => e !== element)
    ].slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Elemen Target
      </label>
      <div className="relative">
        <div className="flex items-center relative">
          <input
            type="text"
            className="input-field pl-10 pr-4"
            placeholder="Cari elemen..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
          />
          <div className="absolute left-3 text-gray-400">
            <FaSearch />
          </div>
        </div>
        
        {isDropdownOpen && (
          <div className="absolute w-full mt-2 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin h-5 w-5 border-b-2 border-[var(--primary)] rounded-full mx-auto mb-2"></div>
                <p>Memuat elemen...</p>
              </div>
            ) : filteredElements.length > 0 ? (
              <div>
                {searchTerm && recentSearches.length > 0 && (
                  <div className="py-2 px-3 text-xs font-medium text-gray-500 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center">
                      <span className="mr-1">
                        <FaHistory />
                      </span>
                      <span>Pencarian Terakhir</span>
                    </div>
                  </div>
                )}
                
                {searchTerm && recentSearches.some(e => e.toLowerCase().includes(searchTerm.toLowerCase())) && (
                  <div className="max-h-20 overflow-y-auto">
                    {recentSearches
                      .filter(e => e.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map(element => (
                        <div
                          key={`recent-${element}`}
                          className={`p-2 cursor-pointer hover:bg-gray-100 flex items-center ${
                            selectedElement === element ? "bg-blue-50 text-[var(--primary)]" : ""
                          }`}
                          onClick={() => handleSelectElement(element)}
                        >
                          <span className="mr-2 text-gray-400 text-xs">
                            <FaHistory />
                          </span>
                          <span>{element}</span>
                        </div>
                      ))}
                  </div>
                )}

                <div className={searchTerm ? "border-t border-gray-200" : ""}>
                  {filteredElements.map((element) => (
                    <div
                      key={element}
                      className={`p-3 cursor-pointer hover:bg-gray-100 ${
                        selectedElement === element ? "bg-blue-50 text-[var(--primary)] font-medium" : ""
                      }`}
                      onClick={() => handleSelectElement(element)}
                    >
                      {element}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                Elemen tidak ditemukan
              </div>
            )}
          </div>
        )}
      </div>
      
      {selectedElement && (
        <div className="mt-2 px-3 py-2 bg-[var(--primary-light)]/10 text-[var(--primary)] rounded-lg font-medium flex items-center">
          <span className="mr-2">✓</span>
          <span>{selectedElement}</span>
        </div>
      )}
    </div>
  );
}