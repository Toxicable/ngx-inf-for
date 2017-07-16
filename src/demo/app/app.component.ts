import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  template: `
  <button (click)="display == 'basic' ? display = 'full' : display = 'basic'">Toggle Demo</button>
  <ng-container *ngIf="display == 'basic'; else full">
    <basic></basic>
  </ng-container>

  <ng-template #full>
    <full></full>
  </ng-template>

  `
})
export class AppComponent {
  display = 'basic';

}
