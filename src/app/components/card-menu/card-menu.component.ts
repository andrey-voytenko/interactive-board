import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-card-menu',
	templateUrl: './card-menu.component.html',
	styleUrls: ['./card-menu.component.scss'],
})
export class CardMenuComponent {
	@Input() index?: number;
	@Output() onCopy = new EventEmitter();
	@Output() onRemove = new EventEmitter();
}
