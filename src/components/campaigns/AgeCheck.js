import React, {Component} from 'react'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import ring from '../../img/main/ring.svg'

class AgeCheck extends Component {

  render() {
    console.log(this.props);
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
