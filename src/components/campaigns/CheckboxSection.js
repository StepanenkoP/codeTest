import React, { Component } from 'react';
import {Link} from 'react-router';
import Checkbox from 'rc-checkbox'

class CheckboxSection extends Component {
  state = {
    disabled: false,
  }
  render() {
    const {title} = this.props
    const allItems = this.props.items.map(item => <label key={item} className="checkbox_label" style={this.props.width}>
      <Checkbox
        disabled={this.state.disabled}
      /><span className="label_text">{item}</span>
    </label>)
    return (
      <div className="checkbox_section">
        <p className="title">{title}</p>
        <div className="wrapper">
          {allItems}
        </div>
      </div>
    )
  }
}

CheckboxSection.propTypes = {
  title: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired,
  width: React.PropTypes.obj
}

export default CheckboxSection;
