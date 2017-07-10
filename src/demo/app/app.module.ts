import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollerModule } from 'ngx-inf-for';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, InfiniteScrollerModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
