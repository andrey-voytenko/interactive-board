export interface ICard {
	title: string;
	description: string;
	createDate: Date;
	updateDate?: Date;
	backgroundImage: string;
	isDraggable: boolean;
	focused: boolean;
}

export interface ICardEdit {
	cardIndex: number;
	title: string;
	description: string;
	updateDate: Date;
}

export interface IStatus {
	isDraggingModeActive: boolean;
	isCardEditModalShown: boolean;
}
