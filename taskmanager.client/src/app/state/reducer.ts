import { createAction, createReducer, on } from '@ngrx/store';
import { AppState } from '../reference';

const initialState:AppState = {showLoader:false};

export const reducer = createReducer(
  initialState,
  on(createAction(''), (state) => {
    return {
      ...state,
    };
  })
);
