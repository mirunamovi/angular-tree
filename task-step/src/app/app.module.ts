import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from './button/button.component';
import { NodeDialogComponent } from './node-dialog/node-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from './tree/tree.module';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    NodeDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    TreeModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
