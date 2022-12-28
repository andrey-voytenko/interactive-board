import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/store';
import {
	AddCardAction,
	ChangeFocusedCardAction,
	CopyCardAction,
	RemoveCardAction,
	StartDraggingAction,
	StopDraggingAction,
} from 'src/app/store/actions/board.actions';
import { OpenDialogAction } from 'src/app/store/actions/dialog.actions';
import { ICard, IStatus } from 'src/app/store/models/card.model';
import {
	cardsCountSelector,
	cardsSelector,
	focusedCardIndexSelector,
	statusSelector,
} from 'src/app/store/selectors/board.selectors';
import { CardEditModalComponent } from '../modals/card-edit-modal/card-edit-modal.component';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnDestroy {
	constructor(private store$: Store<IAppState>) {}

	public cards$ = this.store$.pipe(select(cardsSelector));
	public status$ = this.store$.pipe(select(statusSelector));

	private focusedCardIndex$ = this.store$.pipe(
		select(focusedCardIndexSelector)
	);
	private cardsCount$ = this.store$.pipe(select(cardsCountSelector));

	private statusSelectorSubscription$: Subscription;
	private focusedCardIndexSelectorSubscription$: Subscription;
	private cardsCountSubsctiption$: Subscription;

	private isDraggingMode = false;
	private focusedCardIndex = -1;
	private cardsCount = 0;

	ngOnInit(): void {
		this.statusSelectorSubscription$ = this.status$.subscribe(
			(status: IStatus) => {
				this.isDraggingMode = status.isDraggingModeActive;
			}
		);

		this.focusedCardIndexSelectorSubscription$ =
			this.focusedCardIndex$.subscribe((index: number) => {
				this.focusedCardIndex = index;
			});

		this.cardsCountSubsctiption$ = this.cardsCount$.subscribe(
			(count: number) => {
				this.cardsCount = count;
			}
		);
	}

	ngOnDestroy(): void {
		this.statusSelectorSubscription$.unsubscribe();
		this.focusedCardIndexSelectorSubscription$.unsubscribe();
		this.cardsCountSubsctiption$.unsubscribe();
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
		const createDate = new Date();
		const titleSuffix = `${this.cardsCount + 1}`;
		this.store$.dispatch(new AddCardAction({ createDate, titleSuffix }));
	}

	public openEditCardModal(cardIndex: number, card: ICard) {
		this.store$.dispatch(
			new OpenDialogAction(CardEditModalComponent, {
				values: {
					cardIndex,
					title: card.title,
					description: card.description,
				},
				config: {
					width: '400px',
					disableClose: true,
				},
			})
		);
	}

	public copyCard(cardIndex: number) {
		const createDate = new Date();
		this.store$.dispatch(new CopyCardAction({ cardIndex, createDate }));
	}

	public removeCard(cardIndex: number) {
		this.store$.dispatch(new RemoveCardAction({ cardIndex }));
	}

	public trackByIndex(index: number) {
		return index;
	}
}
