import { BoardActions, BoardActionTypes } from '../actions/board.actions';
import { ICard, ICardEdit, IStatus } from '../models/card.model';
import defaultCardValues from '../../mockes/card.mock.json';
import { DialogActionTypes } from '../actions/dialog.actions';

export interface IBoardState {
	cards: ICard[];
	status: IStatus;
}

const initialState: IBoardState = {
	cards: [],
	status: {
		isDraggingModeActive: false,
		isCardEditModalShown: false,
	},
};

export const boardReducer = (
	state: IBoardState = initialState,
	action: BoardActions
) => {
	switch (action.type) {
		case BoardActionTypes.ADD_CARD: {
			const payload = action.payload;

			const newBrick: ICard = {
				title: defaultCardValues.title + payload.titleSuffix,
				description: defaultCardValues.desctiption,
				createDate: payload.createDate,
				backgroundImage: `url(./assets/images/backgrounds/${Math.floor(
					Math.random() * 19
				)}.jpg)`,
				isDraggable: false,
				focused: false,
			};

			return {
				...state,
				cards: [...state.cards, newBrick],
			};
		}
		case BoardActionTypes.COPY_CARD: {
			const payload = action.payload;

			const cardIndex = payload.cardIndex;
			const cardCopy = Object.assign({}, state.cards[cardIndex]);
			cardCopy.title += ' - copy';
			cardCopy.createDate = payload.createDate;
			cardCopy.updateDate = undefined;
			return {
				...state,
				cards: [
					...state.cards.slice(0, cardIndex + 1),
					cardCopy,
					...state.cards.slice(cardIndex + 1),
				],
			};
		}
		case BoardActionTypes.REMOVE_CARD: {
			const cardIndex = action.payload.cardIndex;
			return {
				...state,
				cards: [
					...state.cards.slice(0, cardIndex),
					...state.cards.slice(cardIndex + 1),
				],
			};
		}
		case DialogActionTypes.SAVE_DIALOG: {
			const payload = action.payload as ICardEdit;
			if (!payload) {
				return state;
			}

			return {
				...state,
				cards: state.cards.map((item, index) => {
					if (index === payload.cardIndex) {
						item = {
							...item,
							title: payload.title,
							description: payload.description,
							updateDate: payload.updateDate,
						};
					}
					return item;
				}),
			};
		}
		case BoardActionTypes.START_DRAGGING: {
			const draggingCardIndex = action.payload.draggingCardIndex;
			return {
				...state,
				cards: state.cards.map((item, index) => {
					if (index === draggingCardIndex) {
						item = { ...item, isDraggable: true };
					}
					return item;
				}),
				status: { ...state.status, isDraggingModeActive: true },
			};
		}
		case BoardActionTypes.STOP_DRAGGING: {
			const draggingCardIndex = action.payload.draggingCardIndex;
			const draggableCard = Object.assign({}, state.cards[draggingCardIndex]);

			const focusedCardCardIndex = state.cards.findIndex(x => x.focused);
			let focusedCard = Object.assign({}, state.cards[focusedCardCardIndex]);

			return {
				...state,
				cards: state.cards.map((item, index) => {
					if (focusedCardCardIndex > -1) {
						if (index === focusedCardCardIndex) {
							item = draggableCard;
						}

						if (index === draggingCardIndex) {
							item = focusedCard;
						}
					}

					item = { ...item, isDraggable: false, focused: false };
					return item;
				}),
				status: { ...state.status, isDraggingModeActive: false },
			};
		}
		case BoardActionTypes.CHANGE_FOCUSED_CARD: {
			return {
				...state,
				cards: state.cards.map((item, index) => {
					item = {
						...item,
						focused: index === action.payload.focusedCardIndex,
					};

					return item;
				}),
			};
		}
		default:
			return state;
	}
};

//
