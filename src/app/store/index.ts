import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { boardReducer, IBoardState } from './reducers/board.reducer';

export interface IAppState {
	board: IBoardState;
}

export const reducers: ActionReducerMap<IAppState, any> = {
	board: boardReducer,
};

export const metaReducers: MetaReducer<IAppState>[] = [];
