import React, {Component} from 'react'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class WebsitesCheck extends Component {

  render() {
    const allItems = this.props.items.map(item =>
      <label key={item} className="checkbox_label" style={this.props.width}>
        <Checkbox value={item}/>
        {this.props.checkTitle.indexOf(item) !== -1 ? <span className="passive active"></span> : <span className="passive"></span>}
        {item}
      </label>)
    return (
      <div className="checkbox_section">
        <p className="title">{this.props.title}</p>
        <div className="wrapper">
          <CheckboxGroup
            name="websites"
            value={this.props.checkTitle}
            onChange={this.props.websitesChanged}>
            {allItems}
          </CheckboxGroup>
        </div>
      </div>
    )
  }
}

WebsitesCheck.propTypes = {
  title: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired,
  checkTitle: React.PropTypes.array.isRequired,
  websitesChanged: React.PropTypes.func.isRequired,
}

export default WebsitesCheck
