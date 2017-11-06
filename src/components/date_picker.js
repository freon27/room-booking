import React from "react";
import BootstrapDatePicker from "react-bootstrap-date-picker";

class WrappedDatePicker extends React.Component {
  render() {
    return (
      <BootstrapDatePicker
        dateFormat={this.props.dateFormat}
        value={new Date(this.props.input.value).toISOString()}
        onChange={this.onChange.bind(this)}
      />
    );
  }

  onChange(val, formattedVal) {
    this.props.input.onChange(formattedVal);
  }
}

export default WrappedDatePicker;
