import {
  createFeatureSelector,
  createSelector,
  createSelectorFactory,
} from '@ngrx/store';
import { ToDoState } from './state';
import { ToDoStatus } from '../../../reference';

const getTodoFeatureState = createFeatureSelector<ToDoState>('todo');

export const getShowAssignedTo = createSelector(
  getTodoFeatureState,
  (state) => state.showAssignedTo
);

export const getToDoList = createSelector(
  getTodoFeatureState,
  (state) => state.list
);

export const getSelectedTaskId = createSelector(
  getTodoFeatureState,
  (state) => state.selectedTask?.id
);
export const getSelectedTaskStatus = createSelector(
  getTodoFeatureState,
  (state) => state.selectedTask?.status ?? ToDoStatus.Done
);
export const getSelectedTask = createSelector(
  getTodoFeatureState,
  getToDoList,
  getSelectedTaskId,
  getSelectedTaskStatus,
  (state, data, id, status) =>
    data ? data[status].find((item) => item.id === id) : null
);
