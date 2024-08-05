import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './todo-state/reducer';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ModifyComponent,
  ModifyPresentationalComponent,
  PresentationalComponent,
  TodoRoutingModule,
  ViewComponent,
} from './todo-reference';
import { ShareModule } from '../../share/share.module';
import { EffectsModule } from '@ngrx/effects';
import { TodoFeatureEffects } from './todo-state/effects';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    TodoComponent,
    ViewComponent,
    ModifyComponent,
    PresentationalComponent,
    ModifyPresentationalComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCardModule,
        StoreModule.forFeature('todo', reducer),
    EffectsModule.forFeature([TodoFeatureEffects]),
    TodoRoutingModule,
  ],
})
export class TodoModule {}
