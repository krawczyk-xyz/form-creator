import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum StateType {
  Hidden = 'Hidden',
  Create = 'Create',
  Edit = 'Edit',
}

export type HiddenState = {
  type: StateType.Hidden;
};

export type CreateState = {
  type: StateType.Create;
};

export type EditState = {
  type: StateType.Edit;
  idx: number;
};

export type FieldConfigurationState = HiddenState | CreateState | EditState;

@Injectable({
  providedIn: 'root',
})
export class FieldConfigurationService {
  private configurationSubject$ = new BehaviorSubject<FieldConfigurationState>({
    type: StateType.Hidden,
  });
  public configurationState$ = this.configurationSubject$.asObservable();

  public hideConfiguration() {
    this.configurationSubject$.next({ type: StateType.Hidden });
  }

  public addField() {
    this.configurationSubject$.next({ type: StateType.Create });
  }

  editField(fieldIdx: number) {
    this.configurationSubject$.next({ type: StateType.Edit, idx: fieldIdx });
  }
}
