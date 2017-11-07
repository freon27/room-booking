import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  getFormValues,
  isValid,
  propTypes,
} from 'redux-form';
import * as myActions from '../actions/';
import { hide } from 'redux-modal';

import {
  getRoomSlots,
  dateStringToUnixTime,
  minutesAfterMidnightToUnix,
} from '../helpers';
import TimeSlider from '../components/time_slider';
import AttendeeList from '../components/attendee_list';
import FieldRenderer from '../components/field_renderer';

const initialState = {
  name: '',
  email: '',
  number: '',
  room_booking_time: [420, 450],
};

const required = value => (value ? undefined : 'Required');
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { attendees: [] };
    this.addAttendee = this.addAttendee.bind(this);
  }

  render() {
    const { room } = this.props;
    return (
      <div className="room-booking">
        <form>
          <div className="row">
            <Field
              availableSlots={getRoomSlots(room)}
              component={TimeSlider}
              name="room_booking_time"
            />
          </div>
          <div className="row main-form">
            <div className="col-md-6">
              <div className="form-group">
                <Field
                  type="text"
                  label="Name"
                  component={FieldRenderer}
                  name="name"
                  className="form-control"
                  placeholder="Attendee name...."
                  validate={[required]}
                />
              </div>
              <div className="form-group">
                <Field
                  type="text"
                  label="Email"
                  component={FieldRenderer}
                  name="email"
                  className="form-control"
                  placeholder="Email address...."
                  validate={[required, email]}
                />
              </div>
              <div className="form-group">
                <Field
                  type="text"
                  component={FieldRenderer}
                  label="Phone"
                  name="number"
                  className="form-control"
                  placeholder="Phone number...."
                  validate={[required]}
                />
              </div>
              <div className="pull-right">
                <button
                  className="flat-btn flat-btn-action"
                  onClick={ev => {
                    ev.preventDefault();
                    this.addAttendee();
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <AttendeeList
                  removeAttendee={this.removeAttendee.bind(this)}
                  attendees={this.state.attendees}
                />
              </div>
              <div className="row">
                <button
                  onClick={ev => {
                    ev.preventDefault();
                    this.book();
                  }}
                  disabled={this.state.attendees.length === 0}
                  className="flat-btn flat-btn-main-action pull-right"
                >
                  Book
                </button>
                <button
                  onClick={this.hideModal.bind(this)}
                  className="flat-btn flat-btn-main-neutral pull-right"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  addAttendee() {
    if (this.props.formValid) {
      this.setState({
        attendees: this.state.attendees.concat([this.props.form]),
      });
      this.props.reset();
    }
  }

  removeAttendee(removeIndex) {
    this.setState({
      attendees: this.state.attendees.filter((v, index) => {
        return index !== removeIndex;
      }),
    });
  }

  hideModal(ev) {
    ev.preventDefault();
    this.props.hide('my-modal');
  }

  book() {
    this.props.bookRoom({
      booking: {
        date: dateStringToUnixTime(this.props.dateform.room_date),
        // only the hour and minute of the time_ timestamps are used,
        // the day is always determined by date
        time_start: minutesAfterMidnightToUnix(
          this.props.form.room_booking_time[0]
        ),
        time_end: minutesAfterMidnightToUnix(
          this.props.form.room_booking_time[1]
        ),
        title: 'event title',
        description: 'event description',
        room: this.props.room.name,
      },
      // information about all atendees
      // all 3 fields are required
      passes: this.state.attendees,
    });
  }
}

const mapStateToProps = state => ({
  room: state.booking.roomList[state.booking.bookingFormIndex],
  form: getFormValues('bookingform')(state),
  formValid: isValid('bookingform')(state),
  dateform: getFormValues('roomdate')(state),
});

BookingForm = connect(mapStateToProps, { ...myActions, hide })(BookingForm);

export default reduxForm({
  // a unique name for the form
  initialValues: initialState,
  form: 'bookingform',
})(BookingForm);

BookingForm.propTypes = {
  ...propTypes,
  'room.name': PropTypes.string,
};
