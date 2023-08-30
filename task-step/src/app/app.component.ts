import { Component, Input } from '@angular/core';
import { ButtonService } from './button.service';
import { Tree } from './tree.model';
import { TreeService } from './tree.service';
import { NodeDialogComponent } from './node-dialog/node-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-step';

  activeButtonGroup: 'task' | 'step' | null = null; 
  selectedNode: Tree | null = null;
  nodeName: string = " ";
  addTaskText: string = "Add Task";
  addTaskColor: string = "green";
  addTaskActions: string = "add";

  constructor(private dialog: MatDialog, private buttonService: ButtonService, private treeService: TreeService) {}
  

  getButtonsData(): { text: string; color: string; action: string }[] {
    if (this.activeButtonGroup === 'task') {
      return this.buttonService.getButtonsDataTasks();
    } else if (this.activeButtonGroup === 'step') {
      return this.buttonService.getButtonsDataSteps();
    } else {
      return this.buttonService.getButtonsDataSteps();
    }
  }

  nodeDoubleClicked(eventData: { event: Event, node: Tree }): void {
    this.selectedNode = eventData.node;
    this.nodeName = this.selectedNode.name;

    if (this.selectedNode.type === 'step') {
      this.activeButtonGroup = 'step';

    } else if (this.selectedNode.type === 'task') {
      this.activeButtonGroup = 'task';

    } else this.activeButtonGroup = null;
    
  }

  performAction(action: string): void {
    if (!this.selectedNode) {
      return; 
    }
  
    switch (action) {
      case 'add':
        this.openNodeDialog(false, this.selectedNode, this.selectedNode, action);
        break;
      case 'edit':
        this.openNodeDialog(true, this.selectedNode, this.selectedNode, action);
        break;
      case 'delete':
        this.deleteNode(this.selectedNode);
        break;
    }
  }

  addTask(){
    this.openNodeDialog(false);
  }

  openNodeDialog(editNode: boolean, parentNode?: Tree | null, node?: Tree, action?: string): void {
    const dialogRef = this.dialog.open(NodeDialogComponent, {
      width: '250px',
      data: { editNode, parentNode, node, action},
    });
  
    dialogRef.afterClosed().subscribe((result: Tree | undefined) => {
      if (result) {
        this.treeService.getTreeData();
      }
    });
  }

  deleteNode(node: Tree): void {
    if (confirm(`Are you sure you want to delete ${node.name}?`)) {
      this.treeService.deleteNode(node.id).subscribe(() => {
        this.treeService.getTreeData(); 
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
