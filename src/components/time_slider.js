import React from "react";
import ReactSlider from "react-slider";
import BookingStatusBar from "./booking_status_bar";

import {
  BOOKABLE_START_TIME,
  BOOKABLE_END_TIME,
  MIN_BOOKABLE_SLOT
} from "../constants";

class TimeSlider extends React.Component {
  render() {
    const { onChange, input } = this.props;
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
            pearling={true}
            onChange={this.onChangeHandler.bind(this)}
          />
        </div>
      </div>
    );
  }

  minutesToSlot(minutes) {
    return (minutes - BOOKABLE_START_TIME) / MIN_BOOKABLE_SLOT;
  }

  getSelectedRange(values) {
    let range = [];
    const selectedStart = this.minutesToSlot(values[0]);
    const selectedEnd = this.minutesToSlot(values[1]);
    for (let i = selectedStart; i < selectedEnd; i++) {
      range.push(i);
    }
    return range;
  }

  onChangeHandler(values) {
    this.props.input.onChange(values.slice());
  }
}

export default TimeSlider;
