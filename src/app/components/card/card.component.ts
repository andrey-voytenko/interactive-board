import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardType } from 'src/app/types/card.types';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent {
	@Input() card?: CardType;
	@Input() index?: number;

	@Output() onCopy = new EventEmitter();
	@Output() onRemove = new EventEmitter();
	@Output() onCardDragStarted = new EventEmitter();
	@Output() onCardDragEnded = new EventEmitter();
}
