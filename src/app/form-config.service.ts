import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InputTextFieldConfig } from './input-text-field-configurator/input-text-field-configurator.component';
import { InputCheckboxFieldConfig } from './input-checkbox-field-configurator/input-checkbox-field-configurator.component';
import { SelectFieldConfig } from './select-field-configurator/select-field-configurator.component';

@Injectable({
  providedIn: 'root',
})
export class FormConfigService {
  private configState$ = new BehaviorSubject<
    (InputTextFieldConfig | InputCheckboxFieldConfig | SelectFieldConfig)[]
  >([]);
  public config$ = this.configState$.asObservable();

  public addField(
    field: InputTextFieldConfig | InputCheckboxFieldConfig | SelectFieldConfig
  ) {
    this.configState$.next([...this.configState$.value, field]);
  }
}
