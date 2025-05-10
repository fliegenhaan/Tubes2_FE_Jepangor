"use client"
import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import { Recipe } from "../types";

interface RecipeTreeProps {
  recipes: Recipe[];
  targetElement: string;
}

export default function RecipeTree({ recipes, targetElement }: RecipeTreeProps) {
  const [translate, setTranslate] = useState({ x: 300, y: 100 });
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  
  const uniqueRecipes = React.useMemo(() => {
    const recipeMap = new Map<string, Recipe>();
    
    recipes.forEach(recipe => {
      const sortedIngredients = [...recipe.Ingredients].sort();
      const key = sortedIngredients.join('-');
      
      if (!recipeMap.has(key)) {
        recipeMap.set(key, recipe);
      }
    });
    
    return Array.from(recipeMap.values());
  }, [recipes]);
  
  useEffect(() => {
    if (containerRef) {
      const { width } = containerRef.getBoundingClientRect();
      setTranslate({ x: width / 2, y: 50 });
    }
  }, [containerRef]);
  
  if (!recipes.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500">
        Tidak ada recipe yang ditemukan atau belum melakukan pencarian
      </div>
    );
  }
  
  const treeData = {
    name: targetElement,
    children: uniqueRecipes.map((recipe, index) => ({
      name: `Recipe ${index + 1}`,
      children: recipe.Ingredients.map(Ingredient => ({
        name: Ingredient,
        children: [],
      })),
    })),
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Visualisasi Recipe</h3>
      <div 
        ref={node => setContainerRef(node)} 
        style={{ width: '100%', height: '500px' }}
        className="bg-gray-50 rounded border border-gray-200"
      >
        <Tree
          data={treeData}
          translate={translate}
          orientation="vertical"
          pathFunc="step"
          nodeSize={{ x: 200, y: 100 }}
          separation={{ siblings: 1.2, nonSiblings: 2 }}
          zoomable={true}
          renderCustomNodeElement={({
            nodeDatum,
            toggleNode,
          }) => (
            <g>
              <circle 
                r={nodeDatum.name === targetElement ? 12 : 10} 
                fill={nodeDatum.name === targetElement ? "#10b981" : 
                      nodeDatum.name.startsWith("Recipe") ? "#60a5fa" : "#4ade80"} 
                onClick={toggleNode} 
              />
              <text 
                fill="black" 
                strokeWidth="1" 
                x={20} 
                dy="0.31em"
                style={{ fontWeight: nodeDatum.name === targetElement ? 'bold' : 'normal' }}
              >
                {nodeDatum.name}
              </text>
            </g>
          )}
        />
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>* Klik node untuk mengolapse/mengekspand cabang</p>
        <p>* Scroll untuk zoom in/out, drag untuk memindahkan visualisasi</p>
      </div>
    </div>
  );
}