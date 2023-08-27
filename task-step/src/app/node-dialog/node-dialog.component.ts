
import { Component,  Inject } from '@angular/core';
import { TreeService } from '../tree.service';
import { Tree } from '../tree.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-node-dialog',
  templateUrl: './node-dialog.component.html',
  styleUrls: ['./node-dialog.component.css'],

})
export class NodeDialogComponent {

  editNode: boolean;
  node: Tree;
  nodeForm: FormGroup;
  parentNode: Tree | null;
  action: string;

  constructor(
    public dialogRef: MatDialogRef<NodeDialogComponent>,
    private fb: FormBuilder,
    private treeService: TreeService,
    @Inject(MAT_DIALOG_DATA) public data: { editNode: boolean, parentNode: Tree | null, node: Tree, action: string },
  ) {
    this.editNode = data.editNode;
    this.parentNode = data.parentNode;
    this.node = { ...data.node };
    this.action = data.action;
   
    this.nodeForm = this.fb.group({
      name: [this.node.name],
      owner: [this.node.owner],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    
    if (this.editNode) {
      const updatedNode: Tree = {
        id: this.node.id,
        type: this.node.type,
        name: this.nodeForm.value.name,
        owner: this.node.type === 'step' ? this.nodeForm.value.owner : null,
        parentId: this.parentNode ? this.parentNode.id : null,
        children: this.node.children
      };
      this.treeService.editNode(this.node.id, updatedNode).subscribe((result) => {
        this.dialogRef.close(result);

      });
    } else {
      if(this.action === 'add'){
        const addedNode: Tree = {
          id: uuidv4(),
          type: 'step',
          name: this.nodeForm.value.name,
          owner: this.nodeForm.value.owner,
          parentId: this.parentNode ? this.parentNode.id : null,

        };
        this.treeService.addNode(this.node.parentId, addedNode).subscribe((result) => {
          this.dialogRef.close(result);

        });
      } else {
          const addedNode: Tree = {
            id: this.node.id,
            type: 'task',
            name: this.nodeForm.value.name,
          };
          this.treeService.addNode(this.node.parentId, addedNode).subscribe((result) => {
            this.dialogRef.close(result);

          });

      }
    }
      
  }
}