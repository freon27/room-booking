import { combineReducers } from "redux";
import bookingReducer from "./booking_reducer";

const rootReducer = combineReducers({
  booking: bookingReducer
});

export default rootReducer;
