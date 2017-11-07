import React from 'react';
import PropTypes from 'prop-types';

import ReactSlider from 'react-slider';
import BookingStatusBar from './booking_status_bar';

import {
  BOOKABLE_START_TIME,
  BOOKABLE_END_TIME,
  MIN_BOOKABLE_SLOT,
} from '../constants';

class TimeSlider extends React.Component {
  onChangeHandler(values) {
    this.props.input.onChange(values.slice());
  }

  getSelectedRange(values) {
    const range = [];
    const selectedStart = this.minutesToSlot(values[0]);
    const selectedEnd = this.minutesToSlot(values[1]);
    for (let i = selectedStart; i < selectedEnd; i++) {
      range.push(i);
    }
    return range;
  }

  render() {
    const { input } = this.props;
    return (
      <div className="time-slider">
        <div className="time-slider-wrapper">
          <BookingStatusBar
            availableSlots={this.props.availableSlots}
            selectedSlots={this.getSelectedRange(input.value)}
          />
          <ReactSlider
            defaultValue={input.value}
            step={MIN_BOOKABLE_SLOT}
            minDistance={MIN_BOOKABLE_SLOT}
            min={BOOKABLE_START_TIME}
            max={BOOKABLE_END_TIME}
            className="time-slider-slider horizontal-slider"
            pearling
            onChange={this.onChangeHandler.bind(this)}
          />
        </div>
      </div>
    );
  }

  minutesToSlot(minutes) {
    return (minutes - BOOKABLE_START_TIME) / MIN_BOOKABLE_SLOT;
  }
}

export default TimeSlider;

TimeSlider.propTypes = {
  input: PropTypes.object,
  'input.onChange': PropTypes.function,
  availableSlots: PropTypes.array,
};
