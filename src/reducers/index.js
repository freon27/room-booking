import { combineReducers } from 'redux';
import bookingReducer from './booking_reducer';
import { reducer as form } from 'redux-form';
import { reducer as modal } from 'redux-modal';

const rootReducer = combineReducers({
  booking: bookingReducer,
  form,
  modal,
});

export default rootReducer;
