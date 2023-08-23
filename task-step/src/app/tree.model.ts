export interface Tree {
    id: string;
    name: string;
    type: 'task' | 'step';
    owner?: string; 
    children?: Tree[];
    parentId?: string | null;
  }