// types/index.ts
export interface Recipe {
  ingredients: string[];
}

export interface ElementData {
  name: string;
  recipe: string;
  tier: number;
}

export interface SearchParams {
  targetElement: string;
  algorithm: "bfs" | "dfs" | "bidirectional";
  findShortest: boolean;
  maxRecipes: number;
}

export interface SearchResult {
  targetElement: string;
  recipes: Recipe[];
  visitedNodes: number;
  timeElapsed: number;
}

export interface ElementListResponse {
  elements: string[];
}

export interface TreeNode {
  id: string;
  name: string;
  children: TreeNode[];
  tier?: number;
  attributes?: {
    type?: string;
    [key: string]: any;
  };
}