import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message-minlength',
  template: `
    <div class="ui-message ui-messages-error"
    *ngIf="temErro()">
    Mínimo de {{control.errors?.minlength?.requiredLength }} caracteres
    </div>
    `,
  styles: []
})
export class MessageMinlengthComponent {

  @Input() control: FormControl;

  temErro(): boolean {
    return this.control.hasError('minlength') && this.control.dirty;
  }


}
