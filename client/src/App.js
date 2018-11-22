import React, { Component } from 'react';
import Menu from './components/menu/Menu';
import PriceCompare from './components/price_compare/PriceCompare'
import SideBar from './components/side_bar/SideBar'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <SideBar />
        <PriceCompare />
      </div>
    );
  }
}

export default App;
