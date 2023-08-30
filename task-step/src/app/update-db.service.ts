// import { Injectable } from '@angular/core';
// import { Tree } from './tree.model';
// import { BehaviorSubject } from 'rxjs';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

// interface OutputNode extends Tree {
//   children?: OutputNode[];
// }

// @Injectable({
//   providedIn: 'root'
// })


// export class UpdateDbService {

//  dataSource = new BehaviorSubject<Tree[]>([]);
//  dataSource2 = new BehaviorSubject<Tree[]>([]);
//  private apiUrl = 'http://localhost:3000/TREE_DATA'; 
//  flatData2: Tree[] = []; 

//  constructor(private http: HttpClient) {}
 
//   buildTree(flatData: Tree[]): BehaviorSubject<Tree[]> {
//     const treeMap: Record<string, OutputNode> = {};
//     const roots: OutputNode[] = [];
//     flatData.forEach(node => {
//       const outputNode: Tree = { ...node,children: []};
//       treeMap[node.id] = outputNode;
//       if (node.parentId === node.id) {
//         roots.push(outputNode);
//       } else {
//         const parent = treeMap[node.parentId as string];
//         if (parent) {
//           if (!parent.children) {
//             parent.children = [];
//           }
//           parent.children.push(outputNode);
//         }
//       }
//     });

//     const newData = new BehaviorSubject<Tree[]> (roots);
//     return newData;   
//   }  


// getTreeData2(): Observable<Tree[]> {
//   return this.http.get<Tree[]>(`${this.apiUrl}`);
// }

// loadTreeData(){
//    let flatData3 : Tree[] = [];  
//  this.getTreeData2().subscribe( data => {
//     flatData3 = data;
//     this.dataSource = this.buildTree(data);          
//     this.dataSource.subscribe( data => {
//       this.dataSource2.next(data);  
//  });
//   } ); 
// }


//   updateDatabase() {  

//     this.loadTreeData();   

//     const newData = new BehaviorSubject<Tree[]> (this.flatData2);

//     return this.dataSource2;
//   }
// }
