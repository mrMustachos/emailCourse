import { FETCH_SETLIST } from '../actions/types';

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_SETLIST:
			return action.payload;
		default:
			return state;
	}
}