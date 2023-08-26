import { Component, Input } from '@angular/core';
import { ButtonService } from './button.service';
import { Tree } from './tree.model';
import { TreeService } from './tree.service';
import { NodeDialogComponent } from './node-dialog/node-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-step';

  activeButtonGroup?: 'task' | 'step'; 
  selectedNode: Tree | null = null;

  constructor(private dialog: MatDialog, private buttonService: ButtonService, private treeService: TreeService) {}

  getButtonsData(): { text: string; color: string; action: string }[] {
    if (this.activeButtonGroup === 'task') {
      return this.buttonService.getButtonsDataTasks();
    } else if (this.activeButtonGroup === 'step') {
      return this.buttonService.getButtonsDataSteps();
    }
    return []; 
  }

  nodeDoubleClicked(eventData: { event: Event, node: Tree }): void {
    this.selectedNode = eventData.node;
    if (this.selectedNode.type === 'step') {
      this.activeButtonGroup = 'step';

    } else if (this.selectedNode.type === 'task') {
      this.activeButtonGroup = 'task';
  
    }
    
  }

  performAction(action: string): void {
    console.log("BBBBBBBBBBB");
    if (!this.selectedNode) {
      return; 
    }
  
    switch (action) {
      case 'add':
        this.openNodeDialog(false, this.selectedNode);
        break;
      case 'edit':
        this.openNodeDialog(true, this.selectedNode);
        break;
      case 'delete':
        this.deleteNode(this.selectedNode);
        break;
    }
  }

  openNodeDialog(editNode: boolean, parentNode: Tree | null, node?: Tree): void {
    console.log("AAAAAAAAA");
    const dialogRef = this.dialog.open(NodeDialogComponent, {
      width: '250px',
      data: { editNode, parentNode, node: node || { type: 'task' } },
    });
  
    dialogRef.afterClosed().subscribe((result: Tree | undefined) => {
      if (result) {
        this.treeService.loadTreeData();
      }
    });
  }

  deleteNode(node: Tree): void {
    if (confirm(`Are you sure you want to delete ${node.name}?`)) {
      this.treeService.deleteNode(node.id).subscribe(() => {
        this.treeService.loadTreeData(); 
      });
    }
  }

  buttonsDataTask(): { text: string; color: string; action: string }[] {
    return this.buttonService.getButtonsDataTasks();
  }

  buttonsDataStep(): { text: string; color: string; action: string }[] {
    return this.buttonService.getButtonsDataSteps();
  }






}
