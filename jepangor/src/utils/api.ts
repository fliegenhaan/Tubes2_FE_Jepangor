// utils/api.ts
import { ElementListResponse, SearchParams, SearchResult } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export async function getAllElements(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/elements`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    
    const data: ElementListResponse = await response.json();
    return data.elements.sort(); 
  } catch (error) {
    console.error("Failed to fetch elements:", error);
    throw error;
  }
}

export async function findRecipes(params: SearchParams): Promise<SearchResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/find-recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to find recipes:", error);
    throw error;
  }
}