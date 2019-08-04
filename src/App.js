import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/index';

import Root from './Root';

import './global.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Root />
        </Router>
      </Provider>
    );
  }
}

export default App;