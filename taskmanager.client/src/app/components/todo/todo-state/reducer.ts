import { createAction, createReducer, on } from '@ngrx/store';
import { ToDoState } from './state';

const initialState: ToDoState = {
  showAssignedTo: false,
};

export const reducer = createReducer<ToDoState>(
  initialState,
  on(createAction(''), (state): ToDoState => {
    return {
      ...state,
      showAssignedTo: !state.showAssignedTo,
    };
  })
);
