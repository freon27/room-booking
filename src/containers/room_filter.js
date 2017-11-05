import React from "react";
import { Field, reduxForm, actions } from "redux-form";

export const initialState = {
  room_filter_name: "",
  room_filter_attendees: "",
  room_filter_available_only: false
};

class RoomFilter extends React.Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className="room-filter">
        <h4>
          <span className="glyphicon glyphicon-search" /> FILTER
        </h4>
        <form>
          <div className="form-group">
            <label htmlFor="room_filter_name">Room Name</label>
            <Field
              type="text"
              component="input"
              name="room_filter_name"
              className="form-control"
              placeholder="Filter by name..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="room_filter_attendees">Capacity</label>
            <Field
              type="number"
              min="2"
              component="input"
              className="form-control"
              name="room_filter_attendees"
            />
          </div>
          <div className="checkbox">
            <label>
              <Field
                name="room_filter_available_only"
                component="input"
                type="checkbox"
              />{" "}
              Available now
            </label>
          </div>
          <a
            href="#"
            onClick={ev => {
              ev.preventDefault();
              reset();
            }}
          >
            clear filter
          </a>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  // a unique name for the form
  initialValues: initialState,
  form: "roomfilter"
})(RoomFilter);
