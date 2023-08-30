import { Component,  OnInit, Output, EventEmitter } from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NestedTreeControl} from '@angular/cdk/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import { BehaviorSubject } from 'rxjs';
import { TreeService } from '../tree.service';
import { CommonModule } from '@angular/common';
import {Tree} from '../tree.model';
import { UpdateDbService } from '../update-db.service';


interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],

})
export class TreeComponent implements OnInit{


  treeControl = new NestedTreeControl<Tree>(node => node.children);



 // treeControl = new FlatTreeControl<Tree>( node => node.level, node => node.expandable  );
  dataSource = new BehaviorSubject<Tree[]>([]);

  @Output() nodeDoubleClick = new EventEmitter<{ event: Event, node: any }>();
  @Output() nodeDoubleClickforSelected = new EventEmitter<{ event: Event, node: any }>();



  constructor(private treeService: TreeService, private  updatedb: UpdateDbService) {}
  

  isTaskNodeClicked = false;
  
  ngOnInit() {
    this.fetchData();
   
  }

  fetchData() {
    this.dataSource = this.treeService.getTreeData();
  }

  hasChild = (_: number, node: Tree) => !!node.children && node.children.length > 0;

  onNodeDoubleClick(event: Event, node: any): void {
    event.stopPropagation(); // Stop event propagation
    this.isTaskNodeClicked === !this.isTaskNodeClicked;
    this.nodeDoubleClick.emit({ event, node });
  }
  
}

