import React, { Component } from 'react';
import Menu from './components/menu/Menu';
import PriceCompare from './components/price_compare/PriceCompare'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <PriceCompare />
      </div>
    );
  }
}

export default App;
