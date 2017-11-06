import React from "react";
import { Field, reduxForm } from "redux-form";
import WrappedDatePicker from "../components/date_picker";

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
            component={WrappedDatePicker}
            dateFormat="YYYY/MM/DD"
            name="room_date"
            className="form-control"
            placeholder="Select date"
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
