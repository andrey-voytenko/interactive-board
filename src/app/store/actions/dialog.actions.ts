import { Action } from '@ngrx/store';

export enum DialogActionTypes {
	OPEN_DIALOG = '[Dialog] Open dialog',
	SAVE_DIALOG = '[Dialog] Save dialog',
}

export class OpenDialogAction implements Action {
	readonly type = DialogActionTypes.OPEN_DIALOG;
	constructor(public component: unknown, public data: unknown) {}
}

export class SaveDialogAction implements Action {
	readonly type = DialogActionTypes.SAVE_DIALOG;
	constructor(public payload: unknown) {}
}
