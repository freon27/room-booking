import React, { Component } from "react";
import TimeSlider from "./time_slider";
import BookingStatusBar from "./booking_status_bar";
import RoomList from "../containers/room_list";

export default class App extends Component {
  render() {
    //<TimeSlider />
    return (
      <div>
        <RoomList />
      </div>
    );
  }
}
