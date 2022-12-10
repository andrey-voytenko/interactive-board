import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { CardType } from 'src/app/types/card.types';
import defaultCardValues from '../../mockes/card.mock.json';
@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
	private isDragging = false;

	public cards: CardType[] = [];

	public onCellMouseover(event: Event, index: number) {
		event.preventDefault();
		this.cards[index].focused = this.isDragging;
	}

	public onCellMouseout(index: number) {
		this.cards[index].focused = false;
	}

	public onCardDragStarted(index: number) {
		this.cards[index].isDraggable = true;
		this.isDragging = true;
	}

	public onCardDragEnded(event: CdkDragEnd, draggableCardId: number) {
		this.cards[draggableCardId].isDraggable = false;
		this.isDragging = false;

		const replacedCardIndex = this.cards.findIndex(x => x.focused);
		if (replacedCardIndex > -1) {
			const draggableCard = this.cards[draggableCardId];
			this.cards[draggableCardId] = this.cards[replacedCardIndex];
			this.cards[replacedCardIndex] = draggableCard;
		}

		event.source._dragRef.reset();
	}

	public addCard() {
		this.cards.push({
			title: defaultCardValues.title + (this.cards.length + 1),
			description: defaultCardValues.desctiption,
			date: new Date(),
			backgroundImage: `url(./assets/images/backgrounds/${Math.floor(
				Math.random() * 19
			)}.jpg)`,
			isDraggable: false,
			focused: false,
		});
	}

	public copyCard(cardId: number) {
		const cardCopy = Object.assign({}, this.cards[cardId]);
		cardCopy.title += ' - copy';
		cardCopy.date = new Date();
		this.cards.splice(cardId + 1, 0, cardCopy);
	}

	public removeCard(cardId: number) {
		this.cards.splice(cardId, 1);
	}
}
