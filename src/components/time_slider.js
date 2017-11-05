import React from "react";
import ReactSlider from "react-slider";
import BookingStatusBar from "./booking_status_bar";

import {
  BOOKABLE_START_TIME,
  BOOKABLE_END_TIME,
  MIN_BOOKABLE_SLOT
} from "../constants";

class TimeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStart: BOOKABLE_START_TIME,
      selectedEnd: BOOKABLE_START_TIME + MIN_BOOKABLE_SLOT * 2
    };
  }
  render() {
    return (
      <div className="time-slider">
        <div className="time-slider-wrapper">
          <BookingStatusBar
            availableSlots={this.props.availableSlots}
            selectedSlots={this.getSelectedRange()}
          />
          <ReactSlider
            defaultValue={[this.state.selectedStart, this.state.selectedEnd]}
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

  getSelectedRange() {
    let range = [];
    for (let i = this.state.selectedStart; i < this.state.selectedEnd; i++) {
      range.push(i);
    }
    return range;
  }

  onChangeHandler(values) {
    this.setState({
      selectedStart: this.minutesToSlot(values[0]),
      selectedEnd: this.minutesToSlot(values[1])
    });
  }
}

export default TimeSlider;
