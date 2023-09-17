import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Tree } from './tree.model';
import { BehaviorSubject } from 'rxjs';

interface OutputNode extends Tree {
  children?: OutputNode[];
}


@Injectable({
  providedIn: 'root'
})

export class TreeService {

  dataSource = new BehaviorSubject<Tree[]>([]);
  dataSource2 = new BehaviorSubject<Tree[]>([]);
  data = this.dataSource.asObservable();
  private apiUrl = 'http://localhost:3000/TREE_DATA'; 
 
  constructor(private http: HttpClient) {}
  
  buildTree(flatData: Tree[]): BehaviorSubject<Tree[]> {
     const treeMap: Record<string, OutputNode> = {};
     const roots: OutputNode[] = [];
     flatData.forEach(node => {
       const outputNode: Tree = { ...node,children: []};
       treeMap[node.id] = outputNode;
       if (node.parentId === node.id) {
         roots.push(outputNode);
       } else {
         const parent = treeMap[node.parentId as string];
         if (parent) {
           if (!parent.children) {
             parent.children = [];
           }
           parent.children.push(outputNode);
         } else {
            this.deleteNode(node.id).subscribe(() => {
              this.getTreeData(); 
            });
         }
       }
     });
 
     const newData = new BehaviorSubject<Tree[]> (roots);
     return newData;   
   }  
 
 
 getTreeData2(): Observable<Tree[]> {
   return this.http.get<Tree[]>(`${this.apiUrl}`);
 }
 
 loadTreeData(){
    this.getTreeData2().subscribe( data => {
      this.dataSource = this.buildTree(data);     
      this.dataSource.subscribe( data => {
        this.dataSource2.next(data);  
    });
   } ); 
 }
 
 
  updateDatabase() {  
     this.loadTreeData();    
     return this.dataSource2;
  }
  

  getTreeData(): BehaviorSubject<Tree[]>  { 
    return this.updateDatabase();
  }


  addNode(parentId: string | null | undefined, newNode: Tree): Observable<Tree> {
    return this.http.post<Tree>(`${this.apiUrl}`, newNode);
  }

  editNode(nodeId: string, updatedNode: Tree): Observable<Tree> {
    return this.http.put<Tree>(`${this.apiUrl}/${nodeId}`, updatedNode);
  }

  deleteNode(nodeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${nodeId}`);
  }
}
