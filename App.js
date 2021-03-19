import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import AppRoute from './src/route/';

import HandlerReducer from './src/reducer';
import { asyncFunctionMiddleware } from './src/reducer/utils';

import { setAppState } from './src/reducer/application/actions';

const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware);
const store = createStore(HandlerReducer, middlewareEnhancer);

export default class App extends React.Component {

  componentDidMount() {
    store.dispatch(setAppState(true));
  }
 
  render() {
    return (
      <Provider store={store}>
        <AppRoute/>
      </Provider>
    );
  }
}
