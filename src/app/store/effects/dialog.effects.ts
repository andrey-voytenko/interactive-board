import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { DialogActionTypes, SaveDialogAction } from '../actions/dialog.actions';
import { ICardEdit } from '../models/card.model';

@Injectable()
export class DialogEffects {
	constructor(private actions$: Actions, private dialog: MatDialog) {}

	dialogOpened$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DialogActionTypes.OPEN_DIALOG),
			mergeMap((payload: any) => {
				const dialogRef = this.dialog.open(payload.component, {
					...payload.data.config,
					data: payload.data.values,
				});

				return dialogRef.afterClosed();
			}),
			map((result: ICardEdit) => {
				if (result === undefined) {
					this.dialog.closeAll();
				} else {
					result.updateDate = new Date();
				}

				return new SaveDialogAction(result);
			})
		)
	);
}
