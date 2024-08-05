import { createAction, createReducer, on } from '@ngrx/store';
import { AppState } from '../reference';
import * as PageActions from '../state/action.page';

const initialState: AppState = { showLoader: false };

export const reducer = createReducer(
  initialState,
  on(PageActions.toggleSpinner, (state): AppState => {
    return {
      ...state,
      showLoader: !state.showLoader,
    };
  })
);
