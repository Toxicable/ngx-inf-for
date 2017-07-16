import { FullComponent } from './full.component';
import { BasicComponent } from './basic.component';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteForModule } from 'ngx-inf-for';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, InfiniteForModule],
  declarations: [ AppComponent, BasicComponent, FullComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
