import React, { PropTypes } from "react";

const BookingBarLabels = ({ blockWidth }) => {
  let blocks = [];
  for (var i = 0; i <= 12; i++) {
    console.log(i, blockWidth, i * blockWidth);
    blocks.push(
      <text
        text-anchor="middle"
        x={i * blockWidth}
        y="15"
        style={{ fontSize: 12, fontWeight: 200, fontStyle: "italic" }}
      >
        {i + 7 < 10 && 0}
        {i + 7}:00
      </text>
    );
  }

  return <svg className="booking-status-bar-labels">{blocks}</svg>;
};

export default BookingBarLabels;
