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
      
      const validRecipes = searchResult.recipes?.filter(recipe => 
        recipe && Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0
      ) || [];
      
      searchResult.recipes = validRecipes;
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

  return { result, isLoading, error, searchRecipes };
}