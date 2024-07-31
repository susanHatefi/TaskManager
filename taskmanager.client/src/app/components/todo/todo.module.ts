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
    StoreModule.forFeature('todo', reducer),
    TodoRoutingModule,
  ],
})
export class TodoModule {}
