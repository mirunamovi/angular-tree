import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from './button/button.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent
    
  ],
  imports: [
    BrowserModule,
    TreeComponent,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
