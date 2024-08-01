import { createAction, props } from '@ngrx/store';
import { BoardModel } from '../../../reference';



export const loadingTodoBoardAction = createAction('[API] Loading The Board');
export const SuccessToloadTodoBoardAction = createAction(
  '[API] Success: Loaded The Board',
  props<{ todoList: BoardModel }>()
);
export const FaildToloadTodoBoardAction = createAction(
  '[API] Failure: Loaded The Board',
  props<{ error: string }>()
);