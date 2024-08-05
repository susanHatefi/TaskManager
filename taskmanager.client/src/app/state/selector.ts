import {
  createFeatureSelector,
  createSelector,
  createSelectorFactory,
} from '@ngrx/store';
import { AppState } from './state';

const generateSelector = createFeatureSelector<AppState>('app');

export const showSpinnerSelector = createSelector(
  generateSelector,
  (state) => state.showLoader
);
