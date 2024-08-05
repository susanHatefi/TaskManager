import { createAction, props } from '@ngrx/store';
import { ToDoState } from './state';
import { Status, ToDoStatus } from '../../../reference';

export const setShowAssignToAction = createAction(
  '[Page] Show The AssignTo In Front Of Tasks'
);

export const setSelectedCardForModifyAction = createAction(
  '[Page] Selected Card For Modify',
  props<{ selectedCard: { id: string; status: ToDoStatus } }>()
);
