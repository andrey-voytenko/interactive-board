import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store';
import { SaveDialogAction } from 'src/app/store/actions/dialog.actions';
import { ICardEdit } from 'src/app/store/models/card.model';

@Component({
	selector: 'app-card-edit-modal',
	templateUrl: './card-edit-modal.component.html',
	styleUrls: ['./card-edit-modal.component.scss'],
})
export class CardEditModalComponent {
	constructor(
		private store$: Store<IAppState>,
		@Inject(MAT_DIALOG_DATA)
		public data: ICardEdit
	) {}

	editForm = new FormGroup({
		title: new FormControl(''),
		description: new FormControl(''),
	});

	save() {
		this.store$.dispatch(new SaveDialogAction({ data: this.data }));
	}
}
