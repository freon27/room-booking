import React from 'react';
import PropTypes from 'prop-types';

const FieldRenderer = ({
  input,
  label,
  placeholder,
  meta: { touched, error, warning },
}) => {
  const classNames =
    'form-control ' +
    (touched && ((error && 'error') || (warning && 'warn') || ''));

  const groupClassnames =
    'form-group ' +
    (touched && ((error && 'has-error') || (warning && 'has-warning') || ''));

  return (
    <div className={groupClassnames}>
      <label>{label}</label>
      <input
        {...input}
        type="text"
        // component={renderField}
        name="room_booking_name"
        className={classNames}
        placeholder={placeholder}
        // validate={[required]}
      />
      <span className="help-block">
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>) ||
            '')}
      </span>
    </div>
  );
};

export default FieldRenderer;

FieldRenderer.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object,
};
