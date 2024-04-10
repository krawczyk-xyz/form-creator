import { Route } from '@angular/router';
import { FormCreatorComponent } from './form-creator/form-creator.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'forms/create'
  },
  {
    path: 'forms/create',
    component: FormCreatorComponent
  }
];
