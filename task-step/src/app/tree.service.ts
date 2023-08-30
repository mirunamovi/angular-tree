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


  private apiUrl = 'http://localhost:3000/TREE_DATA'; 
  dataSource = new BehaviorSubject<Tree[]>([]);
  data = this.dataSource.asObservable();

  

  constructor(private http: HttpClient, private updatedb: UpdateDbService) {}


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
