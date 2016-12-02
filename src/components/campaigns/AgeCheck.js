import React, {Component} from 'react'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class AgeCheck extends Component {

  render() {
    const allItems = this.props.items.map(item =>
      <label key={item} className="checkbox_label">
        <Checkbox value={item}/>
        {this.props.checkTitle.indexOf(item) !== -1 ? <span className="passive active"></span> : <span className="passive"></span>}
        {item}
      </label>)
    return (
      <div className="checkbox_section">
        <p className="title">{this.props.title}</p>
        <div className="wrapper">
          <CheckboxGroup
            name="age"
            value={this.props.checkTitle}
            onChange={this.props.ageChanged}>
            {allItems}
          </CheckboxGroup>
        </div>
      </div>
    )
  }
}

AgeCheck.propTypes = {
  title: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired,
  checkTitle: React.PropTypes.array.isRequired,
  ageChanged: React.PropTypes.func.isRequired,
}

export default AgeCheck
