import {
  createFeatureSelector,
  createSelector,
  createSelectorFactory,
} from '@ngrx/store';
import { ToDoState } from './state';

const getTodoFeatureState = createFeatureSelector<ToDoState>('todo');

export const getShowAssignedTo = createSelector(
  getTodoFeatureState,
  (state) => state.showAssignedTo
);
