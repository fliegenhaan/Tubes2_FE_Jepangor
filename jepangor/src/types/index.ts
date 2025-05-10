export interface Recipe {
  Ingredients: string[];
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
}