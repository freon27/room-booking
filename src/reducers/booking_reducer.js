import {
  FETCH_ROOM_LIST,
  FETCH_ROOM_LIST_SUCCESS,
  FETCH_ROOM_LIST_FAILURE
} from "../actions/types";

export default function(state = { roomList: [] }, action) {
  switch (action.type) {
    case FETCH_ROOM_LIST:
      return {
        ...state,
        isLoading: true
      };
      break;
    case FETCH_ROOM_LIST_SUCCESS:
      console.log(action.payload.data);
      return {
        ...state,
        roomList: state.roomList.concat(action.payload.data),
        isLoading: false
      };
      break;
    default:
      return {
        ...state,
        isLoading: false,
        hasErrored: true,
        error: action.payload
      };
  }
}
