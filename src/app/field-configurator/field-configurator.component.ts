import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  InputCheckboxFieldConfig,
  InputCheckboxFieldConfiguratorComponent,
  InputCheckboxType,
} from '../input-checkbox-field-configurator/input-checkbox-field-configurator.component';
import {
  InputTextFieldConfig,
  InputTextFieldConfiguratorComponent,
  InputTextType,
} from '../input-text-field-configurator/input-text-field-configurator.component';
import {
  SelectFieldConfig,
  SelectFieldConfiguratorComponent,
  SelectType,
} from '../select-field-configurator/select-field-configurator.component';
import { FormConfigService } from '../form-config.service';

type FieldType = InputTextType | InputCheckboxType | SelectType;

@Component({
  selector: 'app-field-configurator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputCheckboxFieldConfiguratorComponent,
    InputTextFieldConfiguratorComponent,
    SelectFieldConfiguratorComponent,
  ],
  templateUrl: './field-configurator.component.html',
})
export class FieldConfiguratorComponent {
  private formConfigService = inject(FormConfigService);

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
    this.formConfigService.addField(field);
    this.selectedType = '';
  }
}
