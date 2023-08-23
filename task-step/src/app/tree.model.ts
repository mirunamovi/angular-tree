export interface TreeNode {
    id: number;
    name: string;
    type: 'task' | 'step';
    owner?: string; 
    children?: TreeNode[];
  }