import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import UserStoryReducers from './store/reducers/story_reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const logger =  store => {
  return next => {
    return action => {
      console.log('[Middleware] Dispatching', action);
      const result = next(action);
      console.log('[Middleware] next state', store.getState());
      return result;
    }
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(UserStoryReducers, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App style={{height: '100%'}}/></Provider>, document.getElementById('root'));
registerServiceWorker();
