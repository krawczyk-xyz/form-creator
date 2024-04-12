import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export type SelectType = 'select';
export type SelectFieldConfig = {
  type: SelectType;
  options: string[];
};

@Component({
  selector: 'app-select-field-configurator',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-field-configurator.component.html',
})
export class SelectFieldConfiguratorComponent {
  @Output() fieldConfigured = new EventEmitter<SelectFieldConfig>();
  public form = this.fb.group({
    options: this.fb.array([], arrayMinLength(2)),
  });

  constructor(private fb: FormBuilder) {}

  get options() {
    return this.form.controls.options.controls;
  }

  addAnotherOption() {
    this.form.controls.options.push(new FormControl('', Validators.required));
  }

  configured() {
    this.fieldConfigured.next({
      type: 'select',
      ...this.form.value,
    } as SelectFieldConfig);
  }
}

const arrayMinLength =
  (min: number): ValidatorFn =>
  (c) => {
    if (c.value.length >= min) {
      return null;
    }

    return { arrayMinLength: { valid: false } };
  };
