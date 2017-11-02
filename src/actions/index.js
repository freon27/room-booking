import {
  FETCH_ROOM_LIST,
  FETCH_ROOM_LIST_SUCCESS,
  FETCH_ROOM_LIST_FAILURE
} from "./types";
import axios from "axios";

export const getRoomList = date => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_ROOM_LIST
    });

    axios
      .post("https://challenges.1aim.com/roombooking/getrooms", {
        date: "today"
      })
      .then(response => {
        dispatch({
          type: FETCH_ROOM_LIST_SUCCESS,
          payload: response
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_ROOM_LIST_FAILURE,
          payload: err
        });
      });
  };
};
