import {
  FETCH_ROOM_LIST,
  FETCH_ROOM_LIST_SUCCESS,
  FETCH_ROOM_LIST_FAILURE,
  SHOW_BOOKING_FORM,
  BOOK_ROOM,
  BOOK_ROOM_SUCCESS,
  BOOK_ROOM_FAILURE
} from "./types";
import { hide, destroy } from "redux-modal";
import { getFormValues } from "redux-form";
import axios from "axios";
import { show } from "react-redux-bootstrap-modal";

export const getRoomList = date => {
  const unixTime = new Date(date).getTime() / 1000;

  return (dispatch, getState) => {
    dispatch({
      type: FETCH_ROOM_LIST
    });

    axios
      .post("https://challenges.1aim.com/roombooking/getrooms", {
        date: unixTime
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

export function showBookingForm(index) {
  return (dispatch, getState) => {
    dispatch({
      type: SHOW_BOOKING_FORM,
      payload: index
    });
    dispatch(show("my-modal", { title: "Form Booking" }));
  };
}

export function bookRoom(data) {
  return (dispatch, getState) => {
    dispatch({
      type: BOOK_ROOM
    });

    axios
      .post("https://challenges.1aim.com/roombooking/sendpasses", data)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: BOOK_ROOM_SUCCESS,
            payload: response
          });
          const selectedDate = getFormValues("roomdate")(getState()).room_date;
          dispatch(getRoomList(selectedDate));
          dispatch(destroy("my-modal"));
        } else {
          dispatch({
            type: BOOK_ROOM_FAILURE,
            payload: err
          });
        }
      })
      .catch(err => {
        dispatch({
          type: BOOK_ROOM_FAILURE,
          payload: err
        });
      });
  };
}
