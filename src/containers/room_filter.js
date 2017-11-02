import React from "react";

class RoomFilter extends React.Component {
  render() {
    return (
      <div className="room-filter col-md-3">
        <h4>FILTER</h4>
        <form>
          <div className="form-group">
            <label htmlFor="room_filter_name">Room Name</label>
            <input
              id="room_filter_name"
              className="form-control"
              placeholder="Filter by name..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="room_filter_attendees">Attendees</label>
            <select className="form-control" id="room_filter_attendees">
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
              <option>5+</option>
              <option>6+</option>
              <option>7+</option>
              <option>8+</option>
            </select>
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" /> Available now
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default RoomFilter;
