import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextFieldConfig } from '../input-text-field-configurator/input-text-field-configurator.component';
import { InputCheckboxFieldConfig } from '../input-checkbox-field-configurator/input-checkbox-field-configurator.component';
import { SelectFieldConfig } from '../select-field-configurator/select-field-configurator.component';

@Component({
  selector: 'app-config-based-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config-based-form.component.html',
})
export class ConfigBasedFormComponent {
  @Input() formConfig: (
    | InputTextFieldConfig
    | InputCheckboxFieldConfig
    | SelectFieldConfig
  )[] = [];

  @Output() deleteField = new EventEmitter<number>();

  editField(fieldIdx: number) {
    console.log(`edit field with idx: ${fieldIdx}`);
  }

  deleteFieldByIdx(fieldIdx: number) {
    console.log(`delete field with idx: ${fieldIdx}`);
    this.deleteField.emit(fieldIdx);
  }
}
