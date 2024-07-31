import { createAction, props } from '@ngrx/store';



export const loadingTodoBoardAction = createAction('[API] Loading The Board');
export const SuccessToloadTodoBoardAction = createAction(
  '[API] Success: Loaded The Board',
  props<{ todoList: any[] }>()
);
export const FaildToloadTodoBoardAction = createAction(
  '[API] Failure: Loaded The Board',
  props<{ error: string }>()
);