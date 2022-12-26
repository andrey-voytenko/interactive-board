import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/store';
import {
	AddCardAction,
	ChangeFocusedCardAction,
	CopyCardAction,
	RemoveCardAction,
	StartDraggingAction,
	StopDraggingAction,
} from 'src/app/store/actions/board.actions';
import { IStatus } from 'src/app/store/models/card.model';
import {
	cardsSelector,
	focusedCardIndexSelector,
	statusSelector,
} from 'src/app/store/selectors/board.selectors';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
	constructor(private store$: Store<IAppState>) {}

	public cards$ = this.store$.pipe(select(cardsSelector));
	public status$ = this.store$.pipe(select(statusSelector));
	public focusedCardIndex$ = this.store$.pipe(select(focusedCardIndexSelector));

	private isDraggingMode = false;
	private focusedCardIndex = -1;

	ngOnInit(): void {
		this.status$.subscribe((status: IStatus) => {
			this.isDraggingMode = status.isDraggingModeActive;
		});

		this.focusedCardIndex$.subscribe((index: number) => {
			this.focusedCardIndex = index;
		});
	}

	public onCellMouseOver(event: Event, focusedCardIndex: number) {
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

	public trackByIndex(index: number) {
		return index;
	}
}
