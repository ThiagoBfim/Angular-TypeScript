import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message-required',
  template: `
  <div class="ui-message ui-messages-error"
  *ngIf="temErro()">
  Informe {{preposicao}} {{control.name}}
  </div>
  `,
  styles: []
})
export class MessageRequiredComponent {

  @Input() control: FormControl;
  @Input() preposicao: string;

  temErro(): boolean {
    return this.control.hasError('required') && this.control.dirty;
  }

}
