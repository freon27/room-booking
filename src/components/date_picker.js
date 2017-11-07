import React from 'react';
import PropTypes from 'prop-types';
import BootstrapDatePicker from 'react-bootstrap-date-picker';

class WrappedDatePicker extends React.Component {
  onChange(val, formattedVal) {
    this.props.input.onChange(formattedVal);
  }

  render() {
    return (
      <BootstrapDatePicker
        dateFormat={this.props.dateFormat}
        value={new Date(this.props.input.value).toISOString()}
        onChange={this.onChange.bind(this)}
      />
    );
  }
}

export default WrappedDatePicker;

WrappedDatePicker.propTypes = {
  'input.onChange': PropTypes.function,
  input: PropTypes.object,
  dateFormat: PropTypes.string,
};
