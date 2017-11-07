import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';

import '../style/style.css';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, thunk)(
  createStore
);

const store = createStoreWithMiddleware(
  reducers /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.container')
);
