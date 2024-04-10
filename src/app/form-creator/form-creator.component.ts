import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  InputTextFieldConfig,
  InputTextFieldConfiguratorComponent,
  InputTextType,
} from '../input-text-field-configurator/input-text-field-configurator.component';
import {
  InputCheckboxFieldConfig,
  InputCheckboxFieldConfiguratorComponent,
  InputCheckboxType,
} from '../input-checkbox-field-configurator/input-checkbox-field-configurator.component';
import {
  SelectFieldConfig,
  SelectFieldConfiguratorComponent,
  SelectType,
} from '../select-field-configurator/select-field-configurator.component';
import { BehaviorSubject } from 'rxjs';
import { ConfigBasedFormComponent } from '../config-based-form/config-based-form.component';

type FieldType = InputTextType | InputCheckboxType | SelectType;

@Component({
  selector: 'app-form-creator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextFieldConfiguratorComponent,
    InputCheckboxFieldConfiguratorComponent,
    SelectFieldConfiguratorComponent,
    ConfigBasedFormComponent,
  ],
  templateUrl: './form-creator.component.html',
})
export class FormCreatorComponent {
  public fieldsConfig$ = new BehaviorSubject<
    (InputTextFieldConfig | InputCheckboxFieldConfig | SelectFieldConfig)[]
  >([]);
  public readonly fieldTypes: { label: string; type: FieldType }[] = [
    {
      label: 'Text input',
      type: 'input-text',
    },
    {
      label: 'Checkbox',
      type: 'input-checkbox',
    },
    {
      label: 'Select',
      type: 'select',
    },
  ];
  public selectedType: FieldType | '' = '';

  fieldConfigured(
    field: InputTextFieldConfig | InputCheckboxFieldConfig | SelectFieldConfig
  ) {
    this.fieldsConfig$.next([...this.fieldsConfig$.value, field]);
    this.selectedType = '';
  }
}
