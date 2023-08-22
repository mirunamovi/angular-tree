import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  constructor(private http: HttpClient) {}

  getTreeData(): Observable<any> {
    return this.http.get(' http://localhost:3000/TREE_DATA');
  }
}
