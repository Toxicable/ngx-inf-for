import { Component } from '@angular/core';

@Component({
  selector: 'basic',
  template: `
  <h1>Basic Example</h1>
  <ng-template (infFor)="loadMore()" [infForOf]="items" let-item>
    <div>{{item | json}}</div>
  <ng-template>
  `
})
export class BasicComponent{
  items = [
    { id: 1, name: 'Toxicable' },
    { id: 2, name: 'Toxicunable' }
  ];
  loadMore() {
    this.items.push({
      id: this.items[this.items.length - 1].id + 1,
      name: 'added Item'
    });
  }
}
