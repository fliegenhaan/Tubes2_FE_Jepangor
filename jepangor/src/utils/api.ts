import { ElementListResponse, SearchParams, SearchResult } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export async function getAllElements(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/elements`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data: ElementListResponse = await response.json();
    return data.elements.sort(); // Mengurutkan elemen secara alfabetis
  } catch (error) {
    console.error("Failed to fetch elements:", error);
    return [];
  }
}

export async function findRecipes(params: SearchParams): Promise<SearchResult | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/find-recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to find recipes:", error);
    return null;
  }
}