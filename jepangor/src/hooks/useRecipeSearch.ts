"use client"
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
      const searchResult = await findRecipes(params);
      
      if (!searchResult) {
        throw new Error("Tidak dapat memperoleh hasil pencarian");
      }
      
      if (searchResult.recipes && Array.isArray(searchResult.recipes)) {
        searchResult.recipes = searchResult.recipes.filter(recipe => 
          recipe && Array.isArray(recipe.Ingredients) && recipe.Ingredients.length === 2
        );
      } else {
        searchResult.recipes = [];
      }
      
      setResult(searchResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat pencarian");
    } finally {
      setIsLoading(false);
    }
  };

  return { result, isLoading, error, searchRecipes };
}