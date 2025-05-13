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
      const actualMaxRecipes = params.maxRecipes === 1 ? 3 : params.maxRecipes;
      
      const apiParams = {
        targetElement: params.targetElement,
        algorithm: params.algorithm,
        multipleRecipe: !params.findShortest,
        maxRecipes: actualMaxRecipes,
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
      
      if (params.maxRecipes === 1 && validRecipes.length > 0) {
        const simplestRecipe = validRecipes.reduce((shortest, current) => {
          const shortestNodeCount = shortest?.nodes?.length || Infinity;
          const currentNodeCount = current?.nodes?.length || Infinity;
          return currentNodeCount < shortestNodeCount ? current : shortest;
        }, validRecipes[0]);
        
        searchResult.recipes = [simplestRecipe];
      } else {
        searchResult.recipes = validRecipes.slice(0, params.maxRecipes);
      }
      
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