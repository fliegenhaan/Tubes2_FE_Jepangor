"use client"
import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import { Recipe, TreeNode } from "../types";
import { FaInfoCircle, FaChevronDown, FaChevronUp, FaDownload } from 'react-icons/fa';

interface RecipeTreeProps {
  recipes: Recipe[];
  targetElement: string;
  treeData?: TreeNode;
}

export default function RecipeTree({ recipes, targetElement, treeData }: RecipeTreeProps) {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(true);
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical");
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: 80 });
    }
  }, [containerRef, recipes, orientation]);
  
  if (!recipes || !recipes.length) {
    return (
      <div className="card p-6 text-center slide-up">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-3xl text-gray-300 mb-3">🧪</div>
          <p className="text-gray-500">Belum ada recipe yang ditemukan</p>
          <p className="text-gray-400 text-sm mt-1">Silakan lakukan pencarian</p>
        </div>
      </div>
    );
  }
  
  const buildRecipeTree = () => {
    if (treeData) {
      return formatTreeData(treeData);
    }
    
    const baseElements = ["Air", "Earth", "Fire", "Water", "Time"];
    
    const rootNode = {
      name: targetElement,
      attributes: { type: 'target' },
      children: [] as any[],
    };
    
    recipes.forEach((recipe, recipeIndex) => {
      const recipeNode = {
        name: `Recipe ${recipeIndex + 1}`,
        attributes: { type: 'recipe' },
        children: [] as any[],
      };
      
      const nodesMap = new Map();
      recipe.nodes.forEach(node => {
        nodesMap.set(node.id, {
          id: node.id,
          name: node.label,
          level: node.level,
          children: []
        });
      });
      
      recipe.links.forEach(link => {
        const parent = nodesMap.get(link.source);
        const child = nodesMap.get(link.target);
        if (parent && child) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(child);
        }
      });
      
      recipe.nodes.filter(node => node.level === 1).forEach(node => {
        const nodeData = nodesMap.get(node.id);
        if (nodeData) {
          const isBaseElement = baseElements.includes(nodeData.name);
          
          const childNode = {
            name: nodeData.name,
            attributes: { 
              type: isBaseElement ? 'base' : 'ingredient',
              level: nodeData.level
            },
            children: buildNodeChildren(nodeData, baseElements, nodesMap),
          };
          
          recipeNode.children.push(childNode);
        }
      });
      
      rootNode.children.push(recipeNode);
    });
    
    return rootNode;
  };
  
  const buildNodeChildren = (node: any, baseElements: string[], nodesMap: Map<string, any>) => {
    if (!node.children || node.children.length === 0) {
      return [];
    }
    
    return node.children.map((child: any) => {
      const isBaseElement = baseElements.includes(child.name);
      
      return {
        name: child.name,
        attributes: { 
          type: isBaseElement ? 'base' : 'ingredient',
          level: child.level
        },
        children: buildNodeChildren(child, baseElements, nodesMap),
      };
    });
  };
  
  const formatTreeData = (node: TreeNode): any => {
    const baseElements = ["Air", "Earth", "Fire", "Water", "Time"];
    const isBaseElement = baseElements.includes(node.name);
    
    return {
      name: node.name,
      attributes: { 
        type: node.name === targetElement ? 'target' : 
              node.name.startsWith('Recipe') ? 'recipe' : 
              isBaseElement ? 'base' : 'ingredient'
      },
      children: node.combine ? node.combine.map(child => formatTreeData(child)) : [],
    };
  };
  
  const treeDataFormatted = buildRecipeTree();
  
  const getTreeDepth = (node: any): number => {
    if (!node.children || node.children.length === 0) {
      return 0;
    }
    return 1 + Math.max(...node.children.map((child: any) => getTreeDepth(child)));
  };
  
  const treeDepth = getTreeDepth(treeDataFormatted);
  
  const handleDownloadSVG = () => {
    if (!containerRef.current) return;
    
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;
    
    const svgClone = svgElement.cloneNode(true) as SVGElement;
    svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
    const svgString = new XMLSerializer().serializeToString(svgClone);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    downloadLink.download = `recipe-tree-${targetElement}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  
  const toggleOrientation = () => {
    setOrientation(orientation === "vertical" ? "horizontal" : "vertical");
  };

  return (
    <div className="card overflow-hidden slide-up">
      <div className="bg-[var(--primary-light)]/10 p-4 flex items-center justify-between">
        <h3 className="flex items-center text-lg font-semibold text-[var(--primary)]">
          <span className="mr-2">
            <FaInfoCircle />
          </span>
          Visualisasi Recipe
        </h3>
        <div className="flex gap-2">
          <button
            onClick={toggleOrientation}
            className="flex items-center px-3 py-1 text-sm bg-white rounded-md border border-gray-200 hover:bg-gray-50"
          >
            <span>{orientation === "vertical" ? "Horizontal" : "Vertical"}</span>
          </button>
          <button
            onClick={handleDownloadSVG}
            className="flex items-center px-3 py-1 text-sm bg-white rounded-md border border-gray-200 hover:bg-gray-50"
          >
            <span className="mr-1 text-gray-500">
              <FaDownload />
            </span>
            <span>Download SVG</span>
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-gray-500 hover:bg-white rounded-md"
          >
            {expanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div
          className="bg-gray-50 transition-all duration-300"
          style={{ height: '550px', overflow: 'hidden' }}
          ref={containerRef}
        >
          <Tree
            data={treeDataFormatted}
            translate={translate}
            orientation={orientation}
            pathClassFunc={() => 'path-link'}
            collapsible={false}
            zoomable={true}
            zoom={0.7}
            nodeSize={{ x: 180, y: 120 }}
            separation={{ siblings: 1, nonSiblings: 1.5 }}
            enableLegacyTransitions={true}
            transitionDuration={800}
            renderCustomNodeElement={(rd3tProps) => (
              <CustomNode 
                {...rd3tProps} 
                targetElement={targetElement}
              />
            )}
          />
        </div>
      )}
      
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around mb-3">
          <NodeLegend color="var(--primary)" type="Target" />
          <NodeLegend color="var(--secondary)" type="Recipe" />
          <NodeLegend color="var(--info)" type="Ingredient" />
          <NodeLegend color="var(--success)" type="Base Element" />
        </div>
        <p className="text-sm text-gray-500 text-center">
          Visualisasi menunjukkan recipe untuk membuat {targetElement}. Klik pada bagian kosong untuk melakukan zoom dan drag untuk bergerak. 
          {treeDepth > 3 && " Tree cukup dalam, anda dapat mengubah orientasi untuk melihat lebih jelas."}
        </p>
      </div>
    </div>
  );
}

function NodeLegend({ color, type }: { color: string; type: string }) {
  return (
    <div className="flex items-center">
      <div 
        className="w-3 h-3 rounded-full mr-1" 
        style={{ backgroundColor: color }}
      ></div>
      <span className="text-xs text-gray-600">{type}</span>
    </div>
  );
}

function CustomNode({ nodeDatum, targetElement }: any) {
  const nodeType = nodeDatum.attributes?.type || 'ingredient';
  
  let bgColor = '#3b82f6';
  let textColor = 'white';
  let borderColor = 'transparent';
  
  switch (nodeType) {
    case 'target':
      bgColor = 'var(--primary)';
      break;
    case 'recipe':
      bgColor = 'var(--secondary)';
      break;
    case 'base':
      bgColor = 'var(--success)';
      break;
    default:
      bgColor = 'var(--info)';
  }
  
  // Special case for the target element
  if (nodeDatum.name === targetElement && nodeType !== 'target') {
    borderColor = 'var(--primary)';
    borderColor = 'var(--primary)';
    bgColor = 'white';
    textColor = 'var(--primary)';
  }

  return (
    <g>
      <rect
        x="-70"
        y="-15"
        width="140"
        height="30"
        rx="15"
        fill={bgColor}
        stroke={borderColor}
        strokeWidth={borderColor !== 'transparent' ? 2 : 0}
      />
      <text
        fill={textColor}
        dy=".3em"
        textAnchor="middle"
        fontSize={12}
        fontWeight="500"
        style={{ pointerEvents: 'none' }}
      >
        {nodeDatum.name}
      </text>
    </g>
  );
}