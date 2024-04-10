import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

export type InputTextType = 'input-text';

export type InputTextFieldConfig = {
  type: InputTextType;
  label: string | null;
  placeholder: string | null;
  maxLength: number | null;
};

@Component({
  selector: 'app-input-text-field-configurator',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input-text-field-configurator.component.html',
})
export class InputTextFieldConfiguratorComponent {
  @Output() public fieldConfigured = new EventEmitter<InputTextFieldConfig>();

  public form = this.fb.group({
    label: ['', Validators.required],
    placeholder: ['', Validators.required],
    maxLength: -1,
  });

  constructor(private fb: FormBuilder) {}

  configured() {
    this.fieldConfigured.next({
      type: 'input-text',
      ...this.form.value,
    } as InputTextFieldConfig);
  }
}
