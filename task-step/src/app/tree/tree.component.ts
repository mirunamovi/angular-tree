import { Component,  OnInit, Output, EventEmitter } from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NestedTreeControl} from '@angular/cdk/tree';
import { BehaviorSubject } from 'rxjs';
import { TreeService } from '../tree.service';
import { CommonModule } from '@angular/common';
import {Tree} from '../tree.model';


// interface Step {
//   name: string;
//   owner: string;
//   children?: Step[];
// }

// interface Task {
//   name: string;
//   children?: Step[];
// }

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],

})
export class TreeComponent implements OnInit{


  treeControl = new NestedTreeControl<Tree>(node => node.children);
  dataSource = new BehaviorSubject<Tree[]>([]);

  @Output() nodeDoubleClick = new EventEmitter<{ event: Event, node: any }>();



  constructor(private treeService: TreeService) {}
  

  isTaskNodeClicked = false;
  
  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.treeService.getTreeData().subscribe(data => {
      this.dataSource.next(data);
    });
  }

  hasChild = (_: number, node: Tree) => !!node.children && node.children.length > 0;

  // isStepNode(node: Tree): node is Step {
  //   return (node as Step).owner !== undefined;
  // }

  onNodeDoubleClick(event: Event, node: any): void {
    event.stopPropagation(); // Stop event propagation
    this.nodeDoubleClick.emit({ event, node });
  }

//   editNode(node: Task | Step): void {
//     // Open a dialog or form for editing
//     const dialogRef = this.dialog.open(EditNodeDialogComponent, {
//         data: { node }
//     });

//     dialogRef.afterClosed().subscribe(updatedNode => {
//         if (updatedNode) {
//             // Call API to update the node data on the JSON server
//             this.treeService.updateNode(updatedNode).subscribe(() => {
//                 // Update the tree data after successful update
//                 this.fetchData();
//             });
//         }
//     });
// }

// deleteNode(node: Task | Step): void {
//     const confirmDelete = confirm('Are you sure you want to delete this node?');

//     if (confirmDelete) {
//         // Call API to delete the node from the JSON server
//         this.treeService.deleteNode(node).subscribe(() => {
//             // Update the tree data after successful deletion
//             this.fetchData();
//         });
//     }
// }

// addNode(parentNode: Task | Step): void {
//   const dialogRef = this.dialog.open(AddNodeDialogComponent, {
//       data: { parentNode }
//   });

//   dialogRef.afterClosed().subscribe(newNode => {
//       if (newNode) {
//           // Call API to add the new node to the JSON server
//           this.treeService.addNode(parentNode, newNode).subscribe(() => {
//               // Update the tree data after successful addition
//               this.fetchData();
//           });
//       }
//   });
// }
  
}

