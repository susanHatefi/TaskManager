import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './todo-state/reducer';

@NgModule({
  declarations: [TodoComponent],
  imports: [CommonModule, StoreModule.forFeature('todo', reducer)],
})
export class TodoModule {}
