"use client"
import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import { Recipe } from "../types";
import { FaInfoCircle, FaChevronDown, FaChevronUp, FaDownload } from 'react-icons/fa';

interface RecipeTreeProps {
  recipes: Recipe[];
  targetElement: string;
}

export default function RecipeTree({ recipes, targetElement }: RecipeTreeProps) {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: 50 });
    }
  }, [containerRef, recipes]);
  
  if (!recipes || !recipes.length) {
    return (
      <div className="card p-6 text-center slide-up">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-3xl text-gray-300 mb-3">🧪</div>
          <p className="text-gray-500">Belum ada recipe yang ditemukan</p>
          <p className="text-gray-400 text-sm mt-1">Silakan lakukan pencarian</p>
        </div>
      </div>
    );
  }
  
  // Format data untuk Tree
  const buildRecipeTree = () => {
    const baseElements = ["Air", "Earth", "Fire", "Water"];
    
    // Mulai dari elemen target sebagai root
    const rootNode = {
      name: targetElement,
      attributes: { type: 'target' },
      children: [] as any[],
    };
    
    // Tambahkan setiap resep sebagai cabang terpisah
    recipes.forEach((recipe, recipeIndex) => {
      if (!recipe.ingredients || recipe.ingredients.length === 0) return;
      
      let recipeNode = {
        name: `Recipe ${recipeIndex + 1}`,
        attributes: { type: 'recipe' },
        children: [] as any[],
      };
      
      // Tambahkan ingredients sebagai children
      recipe.ingredients.forEach(ingredient => {
        const isBaseElement = baseElements.includes(ingredient);
        
        const childNode = {
          name: ingredient,
          attributes: { 
            type: isBaseElement ? 'base' : 'ingredient' 
          },
          children: [] as any[],
        };
        
        recipeNode.children.push(childNode);
      });
      
      rootNode.children.push(recipeNode);
    });
    
    return rootNode;
  };
  
  const treeData = buildRecipeTree();
  
  // Handle download sebagai SVG
  const handleDownloadSVG = () => {
    if (!containerRef.current) return;
    
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;
    
    // Clone SVG untuk modifikasi
    const svgClone = svgElement.cloneNode(true) as SVGElement;
    svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
    // Convert to string
    const svgString = new XMLSerializer().serializeToString(svgClone);
    
    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    downloadLink.download = `recipe-tree-${targetElement}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="card overflow-hidden slide-up">
      <div className="bg-[var(--primary-light)]/10 p-4 flex items-center justify-between">
        <h3 className="flex items-center text-lg font-semibold text-[var(--primary)]">
          <span className="mr-2">
            < FaInfoCircle />
          </span>
          Visualisasi Recipe
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleDownloadSVG}
            className="flex items-center px-3 py-1 text-sm bg-white rounded-md border border-gray-200 hover:bg-gray-50"
          >
            <span className="mr-1 text-gray-500">
              < FaDownload />
            </span>
            <span>Download SVG</span>
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-gray-500 hover:bg-white rounded-md"
          >
            {expanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div
          className="bg-gray-50 transition-all duration-300"
          style={{ height: '500px', overflow: 'hidden' }}
          ref={containerRef}
        >
          <Tree
            data={treeData}
            translate={translate}
            orientation="vertical"
            pathClassFunc={() => 'path-link'}
            collapsible={false}
            zoomable={true}
            zoom={0.8}
            nodeSize={{ x: 180, y: 100 }}
            separation={{ siblings: 1.5, nonSiblings: 2 }}
            enableLegacyTransitions={true}
            transitionDuration={800}
            renderCustomNodeElement={(rd3tProps) => (
              <CustomNode 
                {...rd3tProps} 
                targetElement={targetElement}
              />
            )}
          />
        </div>
      )}
      
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around mb-3">
          <NodeLegend color="var(--primary)" type="Target" />
          <NodeLegend color="var(--secondary)" type="Recipe" />
          <NodeLegend color="var(--info)" type="Ingredient" />
          <NodeLegend color="var(--success)" type="Base Element" />
        </div>
        <p className="text-sm text-gray-500 text-center">
          Visualisasi menunjukkan recipe untuk membuat {targetElement}. Klik pada bagian kosong untuk melakukan zoom dan drag untuk bergerak.
        </p>
      </div>
    </div>
  );
}

function NodeLegend({ color, type }: { color: string; type: string }) {
  return (
    <div className="flex items-center">
      <div 
        className="w-3 h-3 rounded-full mr-1" 
        style={{ backgroundColor: color }}
      ></div>
      <span className="text-xs text-gray-600">{type}</span>
    </div>
  );
}

function CustomNode({ nodeDatum, targetElement }: any) {
  const nodeType = nodeDatum.attributes?.type || 'ingredient';
  
  let bgColor = '#3b82f6'; // default blue
  let textColor = 'white';
  let borderColor = 'transparent';
  
  switch (nodeType) {
    case 'target':
      bgColor = 'var(--primary)';
      break;
    case 'recipe':
      bgColor = 'var(--secondary)';
      break;
    case 'base':
      bgColor = 'var(--success)';
      break;
    default:
      bgColor = 'var(--info)';
  }
  
  // Special case for the target element
  if (nodeDatum.name === targetElement && nodeType !== 'target') {
    borderColor = 'var(--primary)';
    borderColor = 'var(--primary)';
    bgColor = 'white';
    textColor = 'var(--primary)';
  }

  return (
    <g>
      <rect
        x="-60"
        y="-15"
        width="120"
        height="30"
        rx="15"
        fill={bgColor}
        stroke={borderColor}
        strokeWidth={borderColor !== 'transparent' ? 2 : 0}
      />
      <text
        fill={textColor}
        dy=".3em"
        textAnchor="middle"
        fontSize={12}
        fontWeight="500"
        style={{ pointerEvents: 'none' }}
      >
        {nodeDatum.name}
      </text>
    </g>
  );
}