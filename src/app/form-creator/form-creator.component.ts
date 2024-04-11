import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigBasedFormComponent } from '../config-based-form/config-based-form.component';
import { FieldConfiguratorComponent } from '../field-configurator/field-configurator.component';
import { FormConfigService } from '../form-config.service';

@Component({
  selector: 'app-form-creator',
  standalone: true,
  imports: [CommonModule, ConfigBasedFormComponent, FieldConfiguratorComponent],
  templateUrl: './form-creator.component.html',
})
export class FormCreatorComponent {
  private formConfigService = inject(FormConfigService);
  public formConfig$ = this.formConfigService.config$;

  deleteField(fieldIdx: number) {
    this.formConfigService.deleteField(fieldIdx);
  }
}
