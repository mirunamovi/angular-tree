import { Injectable } from '@angular/core';
import { Tree } from './tree.model';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface OutputNode extends Tree {
  children?: OutputNode[];
}

@Injectable({
  providedIn: 'root'
})


export class UpdateDbService {

  // private existingData = require('../db.json'); // Change the path if needed
 // private outputPath = '../db-updated.json'; // Use the desired path
 dataSource = new BehaviorSubject<Tree[]>([]);
 dataSource2 = new BehaviorSubject<Tree[]>([]);
 private apiUrl = 'http://localhost:3000/TREE_DATA'; 
 private flatData: OutputNode[] = [];
 flatData1: Tree[] = [];
 flatData2: Tree[] = []; 

 constructor(private http: HttpClient) {}
 
  buildTree(flatData: Tree[]): BehaviorSubject<Tree[]> {
    const treeMap: Record<string, OutputNode> = {};
    const roots: OutputNode[] = [];
    console.log(flatData);
    flatData.forEach(node => {
      const outputNode: Tree = {
                                 ...node,
                                 children: [],
                                               };

      treeMap[node.id] = outputNode;
    //  console.log(treeMap);
      if (node.parentId === node.id) {
        roots.push(outputNode);
      } else {
        const parent = treeMap[node.parentId as string];
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(outputNode);
        }
      }
  //    console.log(outputNode);      
    });

    console.log(roots);
    const newData = new BehaviorSubject<Tree[]> (roots);
  //  return roots;
   console.log(newData);   
    return newData;   
  }  


getTreeData2(): Observable<Tree[]> {
  return this.http.get<Tree[]>(`${this.apiUrl}`);
}
// async getTreeData2() {
//   let flatData3 : Tree[] = [];
//   let flatData4 : Tree[] = [];  
//   this.http.get<Tree[]>(`${this.apiUrl}`).subscribe(data => { flatData3 = data;          
//    } );  
//    this.flatData1 = await flatData3; 
//    console.log(flatData3);
//    console.log(this.flatData1);
// }




// loadTreeData(){
//   this.getTreeData2().subscribe(data => {
//     this.dataSource.next(data);
//   });
// }

loadTreeData(){
   let flatData3 : Tree[] = [];  
 this.getTreeData2().subscribe( data => {
    flatData3 = data;
    this.dataSource = this.buildTree(data);  

//     this.dataSource.next(data);
     console.log(this.dataSource);   
        
     this.dataSource.subscribe( data => {
      this.dataSource2.next(data);  
      console.log(this.dataSource2);   
 });
  } ); 
}


  updateDatabase() {  

    // this.getTreeData2().subscribe({
    //   next(data) {
    //     this.flatData1 = data;
    //   }
    // });

    this.loadTreeData();


//    this.getTreeData2().subscribe( data => {
//     this.dataSource = new BehaviorSubject<Tree[]> (this.buildTree(data));  
// //     this.dataSource.next(data);
//      console.log(this.dataSource);      

//   } ); 




   // const nestedData = this.buildTree(this.flatData2);
   // this.flatData1 = this.getTreeData2();   
    console.log(this.flatData1);
    console.log(this.dataSource);  
    console.log(this.dataSource2);   
    //const newData = { TREE_DATA: nestedData };
    //const newData = new BehaviorSubject<Tree[]> (nestedData);
    const newData = new BehaviorSubject<Tree[]> (this.flatData2);

   // console.log(flatData1);    

    console.log('Database update complete.');

    return this.dataSource2;
  }
}
