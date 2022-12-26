export interface ICard {
	title: string;
	description: string;
	date: Date;
	backgroundImage: string;
	isDraggable: boolean;
	focused: boolean;
}

export interface IStatus {
	isDraggingModeActive: boolean;
}
