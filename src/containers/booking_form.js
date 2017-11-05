import _ from "lodash";

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, actions, getFormValues, isValid } from "redux-form";

import { getRoomSlots } from "../helpers";
import TimeSlider from "../components/time_slider";
import AttendeeList from "../components/attendee_list";

export const initialValues = {
  room_booking_name: "",
  room_booking_email: "",
  room_booking_phone: ""
};

const required = value => (value ? undefined : "Required");

const renderField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error, warning }
}) => {
  const classNames =
    "form-control " +
    (touched && ((error && "error") || (warning && "warn") || ""));

  const groupClassnames =
    "form-group " +
    (touched && ((error && "has-error") || (warning && "has-warning") || ""));

  return (
    <div className={groupClassnames}>
      <label>{label}</label>
      <input
        {...input}
        type="text"
        component={renderField}
        name="room_booking_name"
        className={classNames}
        placeholder={placeholder}
        validate={[required]}
      />
      <span className="help-block">
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>) ||
            "")}
      </span>
    </div>
  );
};

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { attendees: [] };
    this.addAttendee = this.addAttendee.bind(this);
    this.setTimeRange = this.setTimeRange.bind(this);
  }

  render() {
    const { room, reset } = this.props;
    return (
      <div className="room-booking">
        <form>
          <div className="row">
            <TimeSlider availableSlots={getRoomSlots(room)} />
          </div>
          <div className="row main-form">
            <div className="col-md-6">
              <div className="form-group">
                <Field
                  type="text"
                  label="Name"
                  component={renderField}
                  name="room_booking_name"
                  className="form-control"
                  placeholder="Attendee name...."
                  validate={[required]}
                />
              </div>
              <div className="form-group">
                <Field
                  type="text"
                  label="Email"
                  component={renderField}
                  name="room_booking_email"
                  className="form-control"
                  placeholder="Email address...."
                  validate={[required]}
                />
              </div>
              <div className="form-group">
                <Field
                  type="text"
                  component={renderField}
                  label="Phone"
                  name="room_booking_phone"
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
                  }}
                  className="flat-btn flat-btn-main-action pull-right"
                >
                  Book
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
        attendees: this.state.attendees.concat([this.props.form])
      });
      this.props.reset();
    }
  }

  setTimeRange() {}

  removeAttendee(removeIndex) {
    this.setState({
      attendees: this.state.attendees.filter((v, index) => {
        return index !== removeIndex;
      })
    });
  }

  book() {
    console.log(this.state.attendees);
    console.log("");
  }

  setTimeRange(times) {
    this.setState({ timeRange: times });
  }
}

const mapStateToProps = state => ({
  room: state.booking.roomList[state.booking.bookingFormIndex],
  form: getFormValues("bookingform")(state),
  formValid: isValid("bookingform")(state)
});

BookingForm = connect(mapStateToProps, null)(BookingForm);

export default reduxForm({
  // a unique name for the form
  //initialValues: initialState,
  form: "bookingform"
})(BookingForm);
