[![Build Status](https://travis-ci.org/Toxicable/ngx-inf-for.svg?branch=master)](https://travis-ci.org/Toxicable/ngx-inf-for)

# Angular Infinite Scroller 

```shell
npm install ngx-inf-for intersection-observer
```
```js
import { InfiniteForModule } from 'ngx-inf-for';
import 'intersection-observer';

@NgModule({
  imports: [ InfiniteForModule ]
})
```
Since this lib makes heavy use of IntersectionObserver you will need to import the [pollyfill](https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill) for reasonable [browser support](http://caniuse.com/#search=intersection)

```html
<ng-template (infFor)="loadMore()" [infForOf]="items" let-item [infForTrackBy]="trackById">
  <div>{{item}}</div>
<ng-template>
```
Since [Angular does not support `@Output` binding in structual directives sugar syntax](https://github.com/angular/angular/issues/12121) we have to use it the more verbose syntax

Please note that you must have an HTML element inside your `<ng-template>` tags. The bellow example will ***NOT*** work

```html
<ng-template (infFor)="loadMore()" [infForOf]="items" let-item>
  {{item}}
<ng-template>
```


