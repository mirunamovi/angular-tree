import { Component,  OnInit, Output, EventEmitter } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import { BehaviorSubject} from 'rxjs';
import { TreeService } from '../tree.service';
import {Tree} from '../tree.model';


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],

})
export class TreeComponent implements OnInit{


  treeControl = new NestedTreeControl<Tree>(node => node.children);
  dataSource = new BehaviorSubject<Tree[]>([]);

  @Output() nodeDoubleClick = new EventEmitter<{ event: Event, node: any }>();

  isTaskNodeClicked = false;

  constructor(private treeService: TreeService) {}
  
  
  ngOnInit() {
    this.fetchData();
    console.log(this.dataSource);

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

