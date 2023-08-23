import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from './button/button.component';
import { NodeDialogComponent } from './node-dialog/node-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    NodeDialogComponent
    
  ],
  imports: [
    BrowserModule,
    TreeComponent,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
