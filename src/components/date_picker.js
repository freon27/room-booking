import React from "react";
import BootstrapDatePicker from "react-bootstrap-date-picker";

class WrappedDatePicker extends React.Component {
  render() {
    console.log(this.props);
    return (
      <BootstrapDatePicker
        dateFormat={this.props.dateFormat}
        value={new Date(this.props.input.value).toISOString()}
        onChange={this.onChange.bind(this)}
      />
    );
  }

  onChange(val, formattedVal) {
    console.log("CH", this.props);
    console.log("Val", formattedVal);
    this.props.input.onChange(formattedVal);
  }
}

export default WrappedDatePicker;
