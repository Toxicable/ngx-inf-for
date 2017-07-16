import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfForOf } from 'ngx-inf-for';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, InfForOf],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
