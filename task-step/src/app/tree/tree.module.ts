import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import { TreeComponent } from './tree.component';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    TreeComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTreeModule,
    MatButtonModule
  ],
  exports: [
    TreeComponent
  ]
})
export class TreeModule { }