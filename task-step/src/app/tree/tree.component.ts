import { Component,  OnInit, Output, EventEmitter } from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NestedTreeControl} from '@angular/cdk/tree';
import { TreeService } from '../tree.service';
import { CommonModule } from '@angular/common';
import { Tree } from '../tree.model';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, CommonModule],

})
export class TreeComponent implements OnInit{


  treeControl = new NestedTreeControl<Tree>(node => node.children);
  dataSource = new BehaviorSubject<Tree[]>([]);

  @Output() nodeDoubleClick = new EventEmitter<{ event: Event, node: Tree }>();

  constructor(private treeService: TreeService) {}
  
  ngOnInit(): void {
    this.treeService.loadTreeData();
  }

  hasChild = (_: number, node: Tree) => !!node.children && node.children.length > 0;


  onNodeDoubleClick(event: Event, node: Tree): void {
    event.stopPropagation(); 
    this.nodeDoubleClick.emit({ event, node });
  }





}

