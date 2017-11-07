import {
  FETCH_ROOM_LIST,
  FETCH_ROOM_LIST_SUCCESS,
  FETCH_ROOM_LIST_FAILURE,
  SHOW_BOOKING_FORM,
  BOOK_ROOM,
  BOOK_ROOM_SUCCESS,
  BOOK_ROOM_FAILURE,
} from '../actions/types';

export default function(
  state = { roomList: [], bookingFormIndex: null },
  action
) {
  switch (action.type) {
  case FETCH_ROOM_LIST:
    return {
      ...state,
      isLoading: true,
    };
  case FETCH_ROOM_LIST_SUCCESS:
    return {
      ...state,
      roomList: action.payload.data,
      isLoading: false,
    };

  case FETCH_ROOM_LIST_FAILURE:
    return {
      ...state,
      isLoading: false,
      hasErrored: true,
      error: action.payload,
    };

  case BOOK_ROOM:
    return {
      ...state,
      isLoading: true,
    };

  case BOOK_ROOM_SUCCESS:
    return {
      ...state,
      isLoading: false,
    };

  case BOOK_ROOM_FAILURE:
    return {
      ...state,
      isLoading: false,
      hasErrored: true,
      error: action.payload,
    };

  case SHOW_BOOKING_FORM:
    return {
      ...state,
      bookingFormIndex: action.payload,
    };

  default:
    return state;
  }
}
