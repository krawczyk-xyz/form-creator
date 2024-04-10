import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

export type InputCheckboxType = 'input-checkbox';
export type InputCheckboxFieldConfig = {
  type: InputCheckboxType;
  label: string;
};

@Component({
  selector: 'app-input-checkbox-field-configurator',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input-checkbox-field-configurator.component.html',
})
export class InputCheckboxFieldConfiguratorComponent {
  @Output() fieldConfigured = new EventEmitter<InputCheckboxFieldConfig>();
  public form = this.fb.group({
    label: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  configured() {
    this.fieldConfigured.next({
      type: 'input-checkbox',
      ...this.form.value,
    } as InputCheckboxFieldConfig);
  }
}
