import {
  FETCH_ROOM_LIST,
  FETCH_ROOM_LIST_SUCCESS,
  FETCH_ROOM_LIST_FAILURE,
  SHOW_BOOKING_FORM
} from "../actions/types";

export default function(
  state = { roomList: [], bookingFormIndex: null },
  action
) {
  switch (action.type) {
    case FETCH_ROOM_LIST:
      return {
        ...state,
        isLoading: true
      };
      break;
    case FETCH_ROOM_LIST_SUCCESS:
      return {
        ...state,
        roomList: action.payload.data,
        isLoading: false
      };
      break;
    case SHOW_BOOKING_FORM:
      return {
        ...state,
        bookingFormIndex: action.payload
      };
    default:
      return {
        ...state,
        isLoading: false,
        hasErrored: true,
        error: action.payload
      };
  }
}
