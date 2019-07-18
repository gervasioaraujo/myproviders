import React, { Component } from 'react';
import Navigator from './src/Navigator';
import { Provider } from 'react-redux';
import storeConfig from './src/store/storeConfig';

const store = storeConfig();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

