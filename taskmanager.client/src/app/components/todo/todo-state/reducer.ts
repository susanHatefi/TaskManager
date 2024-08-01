import { createAction, createReducer, on } from '@ngrx/store';
import { ToDoState } from './state';
import * as PageActions from '../todo-state/action.page';
import * as ApiActions from '../todo-state/action.api';

const initialState: ToDoState = {
  showAssignedTo: false,
  list:null,
};

export const reducer = createReducer<ToDoState>(
  initialState,
  on(PageActions.setShowAssignToAction, (state): ToDoState => {
    return {
      ...state,
      showAssignedTo: !state.showAssignedTo,
    };
  }),
  on(
    ApiActions.SuccessToloadTodoBoardAction,
    (state, { todoList }): ToDoState => {
      return {
        ...state,
        list: {...todoList},
      };
    }
  )
);
