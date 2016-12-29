import React, {Component} from 'react'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import ring from '../../img/main/ring.svg'

class DaysCheck extends Component {

  render() {
    const {error} = this.props
    const allItems = this.props.items.length ? this.props.items.map(item =>
      <label key={item.id} className="checkbox_label">
        <Checkbox value={item.title}/>
        {this.props.checkTitle.indexOf(item.title) !== -1 ? <span className="passive active"></span> : <span className="passive"></span>}
        {item.title}
      </label>) : <img src={ring} alt="alt"/>
    return (
      <div className="checkbox_section">
        <p className="title">{this.props.title} {error && <span className="validate_span" style={{color:'#F12B24', }}> - {error}</span>}</p>
        <div className="wrapper">
          <CheckboxGroup
            name="days"
            value={this.props.checkTitle}
            onChange={this.props.daysChanged}>
            {allItems}
          </CheckboxGroup>
        </div>
      </div>
    )
  }
}

DaysCheck.propTypes = {
  title: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired,
  checkTitle: React.PropTypes.array.isRequired,
  daysChanged: React.PropTypes.func.isRequired,
}

export default DaysCheck
