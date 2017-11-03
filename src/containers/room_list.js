import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";

import * as actions from "../actions/";
import { BASE_ROOM_URL } from "../constants";
import { timeRangeToSlots } from "../helpers";

import BookingStatusBar from "../components/booking_status_bar";
import RoomFilter from "../containers/room_filter";
import TimeSlider from "../components/time_slider";

class RoomList extends React.Component {
  constructor(props) {
    super(props);
  }

  filterRooms() {
    const { filter, roomList } = this.props;

    if (!filter) {
      return roomList;
    }

    // filter on name
    let visibleRooms = roomList.filter(room => {
      return room.name.indexOf(filter.room_filter_name) !== -1;
    });

    // filter on capicity if selected
    if (filter.room_filter_attendees > 0) {
      visibleRooms = visibleRooms.filter(room => {
        return room.capacity >= filter.room_filter_attendees;
      });
    }
    return visibleRooms;
  }

  getRoomSlots(room) {
    let slots = [];
    for (const rangeString of room.avail) {
      const range = rangeString.split(" - ");
      slots = slots.concat(timeRangeToSlots(range[0], range[1]));
    }
    return slots;
  }

  render() {
    const visibleRooms = this.filterRooms();

    const roomElements = visibleRooms.map(room => {
      return (
        <tr key={`${room.name}:${room.location}:${room.capacity}`}>
          <td className="primary">
            <strong>Room {room.name}</strong>
            <p>{room.location}</p>
          </td>
          <td className="numeric">{room.capacity}</td>
          <td className="booking-status">
            <BookingStatusBar availableSlots={this.getRoomSlots(room)} />
          </td>
          <td>
            <button className="btn btn-primary">
              <span className="glyphicon glyphicon-eye-open" /> View
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="row section-container  ">
        <h3>BOOKING</h3>

        <RoomFilter />
        <div className="section-inner col-md-9">
          <div>
            <table className="table table-hover table-striped ">
              <thead>
                <tr>
                  <th className="col-md-1">Name</th>
                  <th className="col-md-1">
                    <span className="glyphicon glyphicon-user" /> Capacity
                  </th>
                  <th className="col-md-6">
                    <span className="glyphicon glyphicon-calendar" />{" "}
                    Availability
                  </th>
                  <th className="col-md-1" />
                </tr>
              </thead>
              <tbody>{roomElements}</tbody>
            </table>
            <p>
              <strong>
                {roomElements.length} matching room{roomElements.length > 1 && "s"}{" "}
                found...
              </strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.getRoomList();
  }
}

const mapStateToProps = state => ({
  roomList: state.booking.roomList,
  filter: getFormValues("roomfilter")(state)
});

export default connect(mapStateToProps, actions)(RoomList);
