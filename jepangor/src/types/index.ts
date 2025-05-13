export interface RecipeNode {
  id: string;
  label: string;
  level: number;
}

export interface RecipeLink {
  source: string;
  target: string;
}

export interface Recipe {
  id: number;
  ID?: number;
  nodes: RecipeNode[];
  links: RecipeLink[];
}

export interface Element {
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
  target: string;
  targetElement?: string;
  algorithm: string;
  time: number;
  visitedNodes: number;
  recipes: Recipe[];
  treeData?: TreeNode;
}

export interface ElementListResponse {
  elements: string[];
}

export interface TreeNode {
  id: string;
  name: string;
  combine?: TreeNode[];
  children?: TreeNode[];
}