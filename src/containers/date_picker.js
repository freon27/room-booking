import React from "react";
import { Field, reduxForm } from "redux-form";

export const initialState = {
  room_date: new Date().toJSON().slice(0, 10)
};

const DatePicker = props => {
  return (
    <div className="date-picker">
      <form>
        <div className="form-group">
          <label htmlFor="room_date">Select date</label>

          <Field
            type="date"
            component="input"
            name="room_date"
            className="form-control"
            placeholder="Filter by name..."
          />
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  // a unique name for the form
  initialValues: initialState,
  form: "roomdate"
})(DatePicker);
