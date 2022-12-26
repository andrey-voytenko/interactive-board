import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBoardState } from '../reducers/board.reducer';

export const boardFeatureSelectore =
	createFeatureSelector<IBoardState>('board');

export const cardsSelector = createSelector(
	boardFeatureSelectore,
	(state: IBoardState) => state.cards
);

export const statusSelector = createSelector(
	boardFeatureSelectore,
	(state: IBoardState) => state.status
);
