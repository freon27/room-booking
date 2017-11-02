import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/";
import { BASE_ROOM_URL } from "../constants";
import BookingStatusBar from "../components/booking_status_bar";
import RoomFilter from "../containers/room_filter";
import TimeSlider from "../components/time_slider";

class RoomList extends React.Component {
  render() {
    const rooms = this.props.roomList.map(room => {
      return (
        <li>
          <div className="row">
            <div className="col-md-3 room-key-details">
              <h4>Room {room.name}</h4>
              <p>{room.location}</p>
              <p>Capacity: {room.capacity}</p>
              <p>Capacity: {room.size}</p>
            </div>
            <BookingStatusBar className="col-md-6" />
          </div>
          <div>
            <button>Show details</button>
          </div>
        </li>
      );
    });

    // <img src={`${BASE_ROOM_URL}/${room.images[0]}`} />

    return (
      <div className="section-container row">
        <h3>ROOMS</h3>
        <RoomFilter />
        <ul className="room-list col-md-8">{rooms}</ul>
      </div>
    );
  }

  componentDidMount() {
    this.props.getRoomList();
  }
}

const mapStateToProps = ({ booking }) => ({
  roomList: booking.roomList
});

export default connect(mapStateToProps, actions)(RoomList);
