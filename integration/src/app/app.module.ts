import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToxicInfiniteScrollerModule } from 'ngx-inf-for';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, ToxicInfiniteScrollerModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
