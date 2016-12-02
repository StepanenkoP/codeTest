import React, { Component } from 'react';
import Awaiting from './Awaiting'
import NotActive from './NotActive'
import Active from './Active'

class AdList extends Component {
  render() {
    return (
      <div className="ads_wrapper">
        <Awaiting />
        <NotActive />
        <Active />
      </div>
    )
  }
}

export default AdList;
