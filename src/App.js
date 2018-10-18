import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import HomePage from './components/HomePage';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <HomePage />
        </div>
      </Provider>
    );
  }
}

export default App;
