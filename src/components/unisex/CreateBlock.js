import React, { Component } from 'react';
import {Link} from 'react-router';

class CreateBlock extends Component {
  render() {
    return (
      <div className="create_block">
        <Link className="create_block__button">Create Campaign</Link>
        <Link className="create_block__button">Create Advertise</Link>
      </div>
    )
  }
}

export default CreateBlock;
