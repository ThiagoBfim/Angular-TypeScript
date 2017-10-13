import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/Components/inputtext/inputtext';
import { ButtonModule } from 'primeng/Components/button/button';
import { DataTableModule } from 'primeng/Components/datatable/datatable';
import { TooltipModule } from 'primeng/Components/tooltip/tooltip';
import { InputTextareaModule } from 'primeng/Components/inputtextarea/inputtextarea';
import { CalendarModule } from 'primeng/Components/calendar/calendar';
import { SelectButtonModule } from 'primeng/Components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/Components/dropdown/dropdown';
import { InputMaskModule } from 'primeng/Components/inputmask/inputmask';


@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
  ]
})
export class PrimeFacesModuleModule { }
