import Graph from "./Graph";
import { TreeNode } from "./TreeNode";
//import Link from "./Link";

export class Tree extends Graph {
  constructor() {
    super();
    this.root = null;
    this.nodeMap = new Map();
  }

  setRoot(nodeID) {
    this.root = nodeID;
  }

  traverseDF(callback) {
    function traverse(node) {
      if (node) {
        callback(node);
        if (node.children) {
          node.children.forEach(traverse);
        }
      }
    }
    traverse(this.root);
  }

  traverseBF(callback) {
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      callback(node);
      node.children.forEach((child) => queue.push(child));
    }
  }

  loadFromJSON(json) {
    const data = JSON.parse(json);
    // const links = [];

    // create nodes
    //const nodeMap = new Map();
    data.nodes.forEach((nodeData) => {
      const { id, name, title, pic } = nodeData;
      const node = new TreeNode(id, name, title, pic);
      this.nodeMap.set(id, node);
    });

    // Add child nodes to parent nodes
    data.nodes.forEach((nodeData) => {
      const { id, parentId } = nodeData;
      const node = this.nodeMap.get(id);
      if (parentId) {
        const parent = this.nodeMap.get(parentId);
        parent.addChild(node);
      } else {
        this.root = node;
      }
    });
  }
}
// add nodes and links to the graph
//this.addNodes([...nodeMap.values()]);
//this.addEdges(links);
