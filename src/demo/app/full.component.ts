import { Component } from '@angular/core';

@Component({
  selector: 'full',
  template: `
  <h1>Full Example</h1>
  {{isDisabled ? 'The scroller has been disabled with the disabled property' : ''}}

  <ng-template (infFor)="loadMore()"  [infForOf]="items" let-item
  [infForTrackBy]="trackById" itemOffset="2" threshold="0.5" [disabled]="isDisabled">
    <div>{{item | json}}</div>
  <ng-template>
  `
})
export class FullComponent{
  isDisabled = false;
  items = [
    { id: 1, name: 'Toxicable' },
    { id: 2, name: 'Toxicunable' },
    { id: 3, name: 'Toxicinable' },
  ]
  loadMore() {
    if(this.items.length > 50){
      this.isDisabled = true;
    }
    this.items.push({
      id: this.items[this.items.length - 1].id + 1,
      name: 'added Item'
    })
  }
  trackById(item: any, index: number) {
    return item['id']
  }
}
