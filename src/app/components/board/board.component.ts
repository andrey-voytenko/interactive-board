import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/store';
import {
	AddCardAction,
	ChangeFocusedCardAction,
	CopyCardAction,
	RemoveCardAction,
	StartDraggingAction,
	StopDraggingAction,
} from 'src/app/store/actions/board.actions';
import { ICard, IStatus } from 'src/app/store/models/card.model';
import {
	cardsSelector,
	statusSelector,
} from 'src/app/store/selectors/board.selectors';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
	constructor(private store$: Store<IAppState>) {}
	public cards: ICard[] = [];

	private isDraggingMode = false;
	private focusedCardIndex = -1;

	trackByIndex(index: number) {
		return index;
	}

	ngOnInit(): void {
		this.store$.pipe(select(statusSelector)).subscribe((status: IStatus) => {
			this.isDraggingMode = status.isDraggingModeActive;
		});

		this.store$.pipe(select(cardsSelector)).subscribe((cards: ICard[]) => {
			this.cards = cards;
			this.focusedCardIndex = this.cards.findIndex(x => x.focused);
		});
	}

	public onCellMouseover(event: Event, focusedCardIndex: number) {
		event.preventDefault();
		if (this.isDraggingMode && this.focusedCardIndex !== focusedCardIndex) {
			this.store$.dispatch(new ChangeFocusedCardAction({ focusedCardIndex }));
		}
	}

	public onCardDragStarted(draggingCardIndex: number) {
		this.store$.dispatch(new StartDraggingAction({ draggingCardIndex }));
	}

	public onCardDragEnded(event: any, draggingCardIndex: number) {
		this.store$.dispatch(new StopDraggingAction({ draggingCardIndex }));
		event.source._dragRef.reset();
	}

	public addCard() {
		this.store$.dispatch(new AddCardAction());
	}

	public copyCard(cardIndex: number) {
		this.store$.dispatch(new CopyCardAction({ cardIndex }));
	}

	public removeCard(cardIndex: number) {
		this.store$.dispatch(new RemoveCardAction({ cardIndex }));
	}
}
