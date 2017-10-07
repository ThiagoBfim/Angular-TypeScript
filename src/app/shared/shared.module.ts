import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageMinlengthComponent } from './message-minlength/message-minlength.component';
import { MessageRequiredComponent } from './message-required/message-required.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MessageRequiredComponent,
    MessageMinlengthComponent
  ],
  exports: [
    MessageRequiredComponent,
    MessageMinlengthComponent
  ]
})
export class SharedModule { }
