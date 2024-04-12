import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigBasedFormComponent } from '../config-based-form/config-based-form.component';
import { FieldConfiguratorComponent } from '../field-configurator/field-configurator.component';
import { FormConfigService } from '../form-config.service';
import {
  FieldConfigurationService,
  StateType,
} from '../field-configuration.service';

@Component({
  selector: 'app-form-creator',
  standalone: true,
  imports: [CommonModule, ConfigBasedFormComponent, FieldConfiguratorComponent],
  templateUrl: './form-creator.component.html',
})
export class FormCreatorComponent {
  private fieldConfigurationService = inject(FieldConfigurationService);
  public configurationState$ =
    this.fieldConfigurationService.configurationState$;
  private formConfigService = inject(FormConfigService);
  public formConfig$ = this.formConfigService.config$;

  fieldConfiguratorStates = StateType;
  deleteFieldClicked(fieldIdx: number) {
    this.formConfigService.deleteField(fieldIdx);
  }

  editFieldClicked(fieldIdx: number) {
    this.fieldConfigurationService.editField(fieldIdx);
  }

  addFieldClicked() {
    this.fieldConfigurationService.addField();
  }
}
