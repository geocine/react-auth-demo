import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AlertRef } from './helpers/alert';

const middleware = [thunk];
middleware.push(createLogger());

const store = createStore(
  rootReducer,
  {
    userReducer: {
      userInfo: localStorage.getItem('userInfo'),
      accessToken: localStorage.getItem('accessToken')
    }
  },
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// optional cofiguration
const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
};

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AlertProvider
          template={AlertTemplate}
          {...options}
          ref={AlertRef.getInstance()}
        >
          <App />
        </AlertProvider>
      </Provider>
    );
  }
}

render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
