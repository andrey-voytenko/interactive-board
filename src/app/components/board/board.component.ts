import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
	private isDragging = false;

	public bricks = [
		{
			title: 'Lorem Ipsum 1',
			color: '#ffffff',
			isDraggable: false,
			focused: false,
		},
	];

	public onCellMouseover(event: Event, index: number) {
		event.preventDefault();
		this.bricks[index].focused = this.isDragging;
	}

	public onCellMouseout(index: number) {
		this.bricks[index].focused = false;
	}

	public onBrickDragStarted(index: number) {
		this.bricks[index].isDraggable = true;
		this.isDragging = true;
	}

	public onBrickDragEnded(event: CdkDragEnd, draggableBrickId: number) {
		this.bricks[draggableBrickId].isDraggable = false;
		this.isDragging = false;

		const replacedBrickIndex = this.bricks.findIndex(x => x.focused);
		if (replacedBrickIndex > -1) {
			const draggableBrick = this.bricks[draggableBrickId];
			this.bricks[draggableBrickId] = this.bricks[replacedBrickIndex];
			this.bricks[replacedBrickIndex] = draggableBrick;
		}

		event.source._dragRef.reset();
	}

	public addBrick() {
		this.bricks.push({
			title: 'Lorem Ipsum ' + (this.bricks.length + 1),
			color: '#' + Math.floor(Math.random() * 16777215).toString(16),
			isDraggable: false,
			focused: false,
		});
	}
}
