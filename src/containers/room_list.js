import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import { CSSTransitionGroup } from "react-transition-group"; // ES6

import * as actions from "../actions/";
import { BASE_ROOM_URL } from "../constants";
import { timeRangeToSlots, getRoomSlots } from "../helpers";

import BookingStatusBar from "../components/booking_status_bar";
import TimeSlider from "../components/time_slider";
import ExtendedDetails from "../components/extended_details";

// TODO: extract into components

class RoomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expandedItemIndex: null };
  }

  filterRooms() {
    const { filter, roomList } = this.props;

    if (!filter || !roomList) {
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

  render() {
    const visibleRooms = this.filterRooms();
    const { expandedItemIndex } = this.state;
    const roomElements = visibleRooms.map((room, roomIndex) => {
      const roomExpanded = roomIndex === expandedItemIndex;

      const expandButtonIcon = roomExpanded
        ? "flat-btn glyphicon glyphicon-chevron-up"
        : "flat-btn glyphicon glyphicon-chevron-down";

      return (
        <div>
          <div
            className="row room-list-data"
            key={`${room.name}:${room.location}:${room.capacity}`}
          >
            <div className="row">
              <span className="primary col-md-2">
                <strong>Room {room.name}</strong>
                <div className="location">
                  <span className="glyphicon glyphicon-map-marker" />{" "}
                  {room.location}
                </div>
              </span>
              <span className="numeric col-md-1">{room.capacity}</span>
              <span className="booking-status col-md-7">
                <BookingStatusBar availableSlots={getRoomSlots(room)} />
              </span>

              <span className="col-md-2 action-bar">
                <button
                  onClick={() => this.onExpandToggle(roomIndex)}
                  className="flat-btn flat-btn-neutral"
                >
                  <span className={expandButtonIcon} />{" "}
                  {roomExpanded ? "Hide" : "View"}
                </button>
                <button
                  onClick={() => this.props.showBookingForm(roomIndex)}
                  className="flat-btn flat-btn-action"
                >
                  Book
                </button>
              </span>
            </div>
            <div id={`room-show-btn-${roomIndex}`} className="row col-md-12">
              {roomExpanded && <ExtendedDetails room={room} />}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="section-inner room-list">
        <div className="">
          <div className="room-list-header row">
            <span className="col-md-2">Name</span>
            <span className="col-md-1 glyphicon glyphicon-user" />
            <span className="col-md-7" id="availability">
              <span className="glyphicon glyphicon-ok" /> Availability
            </span>
            <span className="col-md-2" />
          </div>
        </div>{" "}
        {roomElements}
        <div className="row">
          <p>
            <strong>
              {roomElements.length} matching room{roomElements.length > 1 && "s"}{" "}
              found...
            </strong>
          </p>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.getRoomList(this.props.date);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.date != this.props.date) {
      this.props.getRoomList(this.props.date);
    }
  }

  onExpandToggle(setIndex) {
    if (setIndex === this.state.expandedItemIndex) {
      this.setState({ expandedItemIndex: null });
    } else {
      this.setState({ expandedItemIndex: setIndex });
    }
  }
}

const mapStateToProps = state => ({
  roomList: state.booking.roomList,
  filter: getFormValues("roomfilter")(state),
  date: getFormValues("roomdate")(state).room_date
});

export default connect(mapStateToProps, actions)(RoomList);
