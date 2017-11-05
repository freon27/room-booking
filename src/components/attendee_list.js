import React, { PropTypes } from "react";

const AttendeeList = ({ attendees, removeAttendee }) => {
  return (
    <div className="attendee-list">
      <ul>
        {attendees &&
          attendees.map((attendee, index) => (
            <li>
              <span>{attendee.room_booking_name}</span>
              <span
                onClick={() => removeAttendee(index)}
                className="glyphicon glyphicon-remove pull-right"
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AttendeeList;
