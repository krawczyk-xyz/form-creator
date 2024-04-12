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
import {
  EditState,
  FieldConfigurationService,
  StateType,
} from '../field-configuration.service';
import { BehaviorSubject, filter, map, mergeWith, switchMap } from 'rxjs';

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
  private fieldConfigurationService = inject(FieldConfigurationService);

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

  public readonly fieldToEdit$ =
    this.fieldConfigurationService.configurationState$.pipe(
      filter((state) => state.type === StateType.Edit),
      map((state) => (state as EditState).idx),
      switchMap((idx) => this.formConfigService.fieldByIdx(idx))
    );
  private readonly selectFieldType$ = new BehaviorSubject<FieldType | ''>('');
  public readonly fieldType$ = this.selectFieldType$.pipe(
    mergeWith(this.fieldToEdit$.pipe(map((field) => field.type)))
  );

  constructor() {
    this.fieldToEdit$ = this.fieldConfigurationService.configurationState$.pipe(
      filter((state) => state.type === StateType.Edit),
      map((state) => (state as EditState).idx),
      switchMap((idx) => this.formConfigService.fieldByIdx(idx))
    );
  }

  fieldConfigured(
    field: InputTextFieldConfig | InputCheckboxFieldConfig | SelectFieldConfig
  ) {
    this.formConfigService.addField(field);
    this.fieldConfigurationService.hideConfiguration();
    this.selectFieldType$.next('');
  }

  closeFieldConfigurator() {
    this.fieldConfigurationService.hideConfiguration();
  }

  setFieldTypeTo(type: FieldType) {
    this.selectFieldType$.next(type);
  }
}
