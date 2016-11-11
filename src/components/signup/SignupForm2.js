import React, {Component} from 'react'
import TextFieldGroup from './TextFieldGroup'
import update from 'react-addons-update'
import {Link} from 'react-router'
import validateSecondForm from '../../functions/validateSecondForm'

class SignupForm2 extends Component {
  state = {
    firstname: this.props.stateObj.firstname,
    lastname: this.props.stateObj.lastname,
    email: this.props.stateObj.email,
    password: this.props.stateObj.password,
    contactnumber: '',
    address: '',
    business: '',
    errors: {}
  }
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    const newData = update(this.state.errors, {[e.target.name]: {$set: ''}});
    this.setState({
      errors: newData
    })
  }
  isValid() {
    const {errors, isValid} = validateSecondForm(this.state)

    if (!isValid) {
      this.setState({
        errors
      })
    }
    return isValid
  }
  onClickHandler = (e) => {
    e.preventDefault();
    this.setState({
      errors : {}
    });
    if (this.isValid()) {
      alert("Check your email for account activation!");
    }
  }
  render() {
    const {errors} = this.state
    return(
      <div>
        <TextFieldGroup
          value={this.state.contactnumber}
          label="Contact Number"
          placeholder="Number"
          type="text"
          field="contactnumber"
          error={errors.contactnumber}
          onChangeHandler={this.onChangeHandler}
          className="form_group__input"
        />
        <TextFieldGroup
          value={this.state.address}
          onChangeHandler={this.onChangeHandler}
          type="text"
          label="Address"
          field="address"
          error={errors.address}
          placeholder="Address"
          className="form_group__input"
        />
        <div className="form_group">
          <label className="form_group__label">Type of business</label>
          <select
            value={this.state.business}
            onChange={this.onChangeHandler}
            name="business"
            className="form_group__input"
          >
            <option value="" disabled>Choose your business</option>
            <option value="Agriculture & Foresty/Wildlife">Agriculture & Foresty/Wildlife</option>
            <option value="Business & Information">Business & Information</option>
            <option value="Construction/Utilities/Contracting">Construction/Utilities/Contracting</option>
            <option value="Education">Education</option>
            <option value="Finance & Ensurance">Finance & Ensurance</option>
            <option value="Food & Hospitality">Food & Hospitality</option>
            <option value="Gaming">Gaming</option>
            <option value="Health Services">Health Services</option>
            <option value="Motor Vehicle">Motor Vehicle</option>
            <option value="Natural Resources/Environmental">Natural Resources/Environmental</option>
            <option value="Other">Other</option>
            <option value="Personal Services">Personal Services</option>
            <option value="Real Estate & Housing">Real Estate & Housing</option>
            <option value="Safety/Security & Legal">Safety/Security & Legal</option>
            <option value="Transportation">Transportation</option>
          </select>
          {errors.business && <span className="validate_span">{errors.business}</span>}
        </div>

        <div className="links">
          <Link to="/login" className="redirect">Login page</Link>
        </div>

        <div className="form_group">
          <button className="form_group__button" onClick={this.onClickHandler}>Sign Up</button>
        </div>
      </div>
    )
  }
}

SignupForm2.propTypes = {
  stateObj: React.PropTypes.object.isRequired
}

export default SignupForm2
