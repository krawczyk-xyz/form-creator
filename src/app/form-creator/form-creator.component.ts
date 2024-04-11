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
  public formConfig$ = inject(FormConfigService).config$;
}
