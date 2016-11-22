import React, { Component } from 'react';
import FlashList from './flash/FlashList'

class App extends Component {
  render() {
    return (
      <div className="AppStart">
        <FlashList />
        <div className="hello">This will be Account Summary page!</div>
      </div>
    );
  }
}

export default App;
