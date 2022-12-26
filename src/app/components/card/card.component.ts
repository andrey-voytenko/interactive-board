import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICard } from 'src/app/store/models/card.model';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent {
	@Input() card?: ICard;
	@Input() index?: number;

	@Output() onCopy = new EventEmitter();
	@Output() onRemove = new EventEmitter();
	@Output() onCardDragStarted = new EventEmitter();
	@Output() onCardDragEnded = new EventEmitter();
}
