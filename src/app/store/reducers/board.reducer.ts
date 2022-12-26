import { BoardActions, BoardActionTypes } from '../actions/board.actions';
import { ICard, IStatus } from '../models/card.model';
import defaultCardValues from '../../mockes/card.mock.json';

export interface IBoardState {
	cards: ICard[];
	status: IStatus;
}

const initialState: IBoardState = {
	cards: [],
	status: {
		isDraggingModeActive: false,
	},
};

export const boardReducer = (
	state: IBoardState = initialState,
	action: BoardActions
) => {
	switch (action.type) {
		case BoardActionTypes.ADD_CARD: {
			const newBrick = {
				title: defaultCardValues.title + (state.cards.length + 1),
				description: defaultCardValues.desctiption,
				date: new Date(),
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
			const cardIndex = action.payload.cardIndex;
			const cardCopy = Object.assign({}, state.cards[cardIndex]);
			cardCopy.title += ' - copy';
			cardCopy.date = new Date();
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
