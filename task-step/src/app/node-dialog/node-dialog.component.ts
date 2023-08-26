
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

  constructor(
    public dialogRef: MatDialogRef<NodeDialogComponent>,
    private fb: FormBuilder,
    private treeService: TreeService,
    @Inject(MAT_DIALOG_DATA) public data: { editNode: boolean, parentNode: Tree | null, node: Tree }
  ) {
    this.editNode = data.editNode;
    this.parentNode = data.parentNode;
    this.node = { ...data.node };
  
    // Create a dynamic form based on node type
    this.nodeForm = this.fb.group({
      name: [null],
      owner: [null],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}