import React from "react";
import { BASE_ROOM_URL } from "../constants";

const ExtendedDetails = ({ room }) => {
  return (
    <div className="extended-details">
      <section className=" col-md-5" id="photos">
        <h5>Photo Gallery - click to view</h5>
        {room.images.map((url, i) => (
          <img
            className={i > 0 ? "tiny" : "main"}
            src={`${BASE_ROOM_URL}/${url}`}
          />
        ))}
      </section>
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-5 col-md-offset-1 detail">
            <h5>Equipment available</h5>
            <ul className="equipment-list">
              {room.equipment.map((item, index) => <li>{item}</li>)}
            </ul>
          </div>
          <div className="col-md-5 col-md-offset-1">
            <h5>Room size</h5>
            <p>{room.size}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendedDetails;
