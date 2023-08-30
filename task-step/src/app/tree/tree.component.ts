import { Component,  OnInit, Output, EventEmitter } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TreeService } from '../tree.service';
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
  dataSource = new BehaviorSubject<Tree[]>([]);
  dataRefresher: any;

  @Output() nodeDoubleClick = new EventEmitter<{ event: Event, node: any }>();
  @Output() nodeDoubleClickforSelected = new EventEmitter<{ event: Event, node: any }>();

  isTaskNodeClicked = false;

  constructor(private treeService: TreeService, private  updatedb: UpdateDbService) {

  }
  
  
  ngOnInit() {
    this.fetchData();
         
   
  }

  fetchData() {
    this.dataSource = this.treeService.getTreeData();
  }

  hasChild = (_: number, node: Tree) => !!node.children && node.children.length > 0;

  onNodeDoubleClick(event: Event, node: any): void {
    event.stopPropagation(); 
    this.isTaskNodeClicked === !this.isTaskNodeClicked;
    this.nodeDoubleClick.emit({ event, node });
  }

  
}

