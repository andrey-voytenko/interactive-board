import { Action } from '@ngrx/store';
import { ICard } from '../models/card.model';

export enum BoardActionTypes {
	ADD_CARD = '[Board] Add card',
	COPY_CARD = '[Board] Copy card',
	REMOVE_CARD = '[Board] Remove card',
	START_DRAGGING = '[Board] Start dragging',
	STOP_DRAGGING = '[Board] Stop dragging',
	CHANGE_FOCUSED_CARD = '[Board] Change focused card',
}

export class AddCardAction implements Action {
	readonly type = BoardActionTypes.ADD_CARD;
}

export class CopyCardAction implements Action {
	readonly type = BoardActionTypes.COPY_CARD;
	constructor(public payload: { cardIndex: number }) {}
}

export class RemoveCardAction implements Action {
	readonly type = BoardActionTypes.REMOVE_CARD;
	constructor(public payload: { cardIndex: number }) {}
}

export class StartDraggingAction implements Action {
	readonly type = BoardActionTypes.START_DRAGGING;
	constructor(public payload: { draggingCardIndex: number }) {}
}

export class StopDraggingAction implements Action {
	readonly type = BoardActionTypes.STOP_DRAGGING;
	constructor(public payload: { draggingCardIndex: number }) {}
}

export class ChangeFocusedCardAction implements Action {
	readonly type = BoardActionTypes.CHANGE_FOCUSED_CARD;
	constructor(public payload: { focusedCardIndex: number }) {}
}

export type BoardActions =
	| AddCardAction
	| CopyCardAction
	| RemoveCardAction
	| StartDraggingAction
	| StopDraggingAction
	| ChangeFocusedCardAction;
