import React from 'react';
import PropTypes from 'prop-types';

const AttendeeList = ({ attendees, removeAttendee }) => {
  return (
    <div className="attendee-list">
      <ul>
        {attendees &&
          attendees.map((attendee, index) => (
            <li>
              <span>{attendee.name}</span>
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

AttendeeList.propTypes = {
  attendees: PropTypes.array,
  removeAttendee: PropTypes.function,
};
