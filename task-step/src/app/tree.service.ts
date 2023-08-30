import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tree } from './tree.model';
import { BehaviorSubject } from 'rxjs';
import { UpdateDbService } from './update-db.service';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  // constructor(private http: HttpClient) {}

  // getTreeData(): Observable<any> {
  //   return this.http.get(' http://localhost:3000/TREE_DATA');
  // }

  private apiUrl = 'http://localhost:3000/TREE_DATA'; 
  dataSource = new BehaviorSubject<Tree[]>([]);
  data = this.dataSource.asObservable();
  flatData1 = this.getTreeData2();

  _dataChange = new BehaviorSubject<Tree[]> (
    [
      {
          "id": "1",
          "name": "Task_1",
          "type": "task",
          "children": [
            { 
              "id": "2",
              "name": "Step_1_1", 
              "type":"step",
              "owner": "Marcel",
              "parentId": "1"
            }, 
            { 
              "id": "3",
              "name": "Step_1_2",
              "type":"step", 
              "owner": "Joe",
              "parentId": "1",
              "children": [
                { 
                  "id": "4",
                  "name": "Step_1_2_1",
                  "type":"step",
                  "owner": "anonymous",
                  "parentId": "3",
                  "children": [
                    { 
                      "id": "5",
                      "name": "Step_1_2_1_1",
                      "type":"step",
                      "owner": "anonymous",
                      "parentId": "4"
                    }
                  ]
               },
               {  
                  "id": "6",
                  "name": "Step_1_2_2",
                  "type":"step",
                  "owner": "anonymous",
                  "parentId": "3"
               }
              ]
            }
          ]
        },
        {
          "id": "7",
          "name": "Task_2",
          "type": "task",
          "children": [
            { 
              "id": "8",
              "name": "Step_2_1",
              "type":"step", 
              "owner": "Bob",
              "parentId": "7",
              "children": [
                { 
                  "id": "9",
                  "name": "Step_2_1_1",
                  "type":"step",
                  "owner": "Bob & Alice",
                  "parentId": "8"
               },
               {  
                  "id": "10",
                  "name": "Step_2_1_2",
                  "type":"step",
                  "owner": "Bob & Max",
                  "parentId": "8"
               }
              ]
            },
            { 
              "id": "11", 
              "name": "Step_2_2",
               "type":"step",
               "owner": "Joe",
               "parentId": "7"
            },
            { 
              "id": "12", 
              "name": "Step_2_3",
               "type":"step",
               "owner": "Joe",
               "parentId": "7"
            }
            ]
        }
      ]
  );


  constructor(private http: HttpClient, private updatedb: UpdateDbService) {}

  
  // loadTreeData(){
  //   this.getTreeData().subscribe(data => {
  //     this.dataSource.next(data);
  //   });
  // }
  loadTreeData(){
    this._dataChange.subscribe(data => {
      this.dataSource.next(data);
    });
  }


  //  getTreeData(): Observable<Tree[]>  {
  //    return this.updatedb.updateDatabase();
  // }

    //  getTreeData(): Observable<Tree[]>  {
    //    return this.flatData1;
    // }



  //  getTreeData2(): Observable<Tree[]> {
  //    return this.http.get<Tree[]>(`${this.apiUrl}`);
  //  }

   getTreeData2(): Observable<Tree[]> {
     return this.http.get<Tree[]>(`${this.apiUrl}`);
   }


   getTreeData(): BehaviorSubject<Tree[]>  {    
    return this.updatedb.updateDatabase();
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
