import { useState } from "react";
import { SearchParams, SearchResult } from "../types";
import { findRecipes } from "../utils/api";

export default function useRecipeSearch() {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchRecipes = async (params: SearchParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const apiParams = {
        targetElement: params.targetElement,
        algorithm: params.algorithm,
        multipleRecipe: !params.findShortest,
        maxRecipes: params.maxRecipes,
      };
      
      console.log("Searching with params:", apiParams);
      
      const searchResult = await findRecipes(apiParams);
      
      if (!searchResult) {
        throw new Error("Tidak dapat memperoleh hasil pencarian");
      }
      
      const validRecipes = searchResult.recipes?.filter(recipe => 
        recipe && Array.isArray(recipe.nodes) && recipe.nodes.length > 0
      ) || [];
      
      validRecipes.forEach((recipe, idx) => {
        recipe.ID = idx;
      });
      
      searchResult.recipes = validRecipes;
      
      if (searchResult.treeData) {
        validateTreeData(searchResult.treeData);
      }
      
      console.log("Processed result:", searchResult);
      
      setResult(searchResult);
      
    } catch (err) {
      console.error("Error during recipe search:", err);
      setError(err instanceof Error 
        ? err.message 
        : "Terjadi kesalahan saat pencarian. Silakan coba lagi.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const validateTreeData = (treeNode: any) => {
    if (!treeNode) return;
    
    if (!treeNode.id) treeNode.id = "node-" + Math.random().toString(36).substr(2, 9);
    if (!treeNode.name) treeNode.name = "Unnamed Node";
    
    if (treeNode.combine && Array.isArray(treeNode.combine)) {
      treeNode.combine.forEach((childNode: any) => validateTreeData(childNode));
    } else {
      treeNode.combine = [];
    }
  };

  return { result, isLoading, error, searchRecipes };
}