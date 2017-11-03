import { combineReducers } from "redux";
import bookingReducer from "./booking_reducer";
import { reducer as form } from "redux-form";
const rootReducer = combineReducers({
  booking: bookingReducer,
  form
});

export default rootReducer;
