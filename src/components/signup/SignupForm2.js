import React, {Component} from 'react'
import TextFieldGroup from './TextFieldGroup'
import update from 'react-addons-update'
import {Link} from 'react-router'
import validateSecondForm from '../../functions/validateSecondForm'
import back from '../../img/signup/back.png'

class SignupForm2 extends Component {
  state = {
    first_name: this.props.stateObj.firstname,
    last_name: this.props.stateObj.lastname,
    email: this.props.stateObj.email,
    password: this.props.stateObj.password,
    show: this.props.stateObj.show,
    contact_number: localStorage.getItem('contact_number') == null ? '' : localStorage.getItem('contact_number'),
    address: localStorage.getItem('address') == null ? '' : localStorage.getItem('address'),
    business_type_id: localStorage.getItem('business_type_id') == null ? '' : localStorage.getItem('business_type_id'),
    errors: {}
  }

  onChangeHandler = (e) => {
    console.log(this.state.errors);
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
      const registerObj = {}
      for (let key in this.state) {
        if (key !== "errors") {
          registerObj[''+ key] = this.state['' + key];
        }
      }
      registerObj.user_type = 1;
      console.log(registerObj);
      this.props.userSignupRequest(registerObj).then((response) => {
          console.log(response);
          if(response.data.success && response.data.success === true) {
            alert("Success! Visit your email to activate your account!");
            this.context.router.push('/login');
          }
          if (response.data.email) {
            alert(response.data.email[0]);
          }
        });
    }
  }


  render() {
    const {errors} = this.state
    console.log(this.props);
    const formData = {
      business_type_id: this.state.business_type_id,
      address: this.state.address,
      contact_number: this.state.contact_number
    }
    return(
      <div>
        <div className="back" onClick={()=> this.props.backClick(formData)}><img src={back} alt="alt"/> Back</div>
        <TextFieldGroup
          value={this.state.contact_number}
          label="Contact Number"
          placeholder="Number"
          type="text"
          field="contact_number"
          error={errors.contact_number}
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
            value={this.state.business_type_id}
            onChange={this.onChangeHandler}
            name="business_type_id"
            className="form_group__input"
          >
            <option value="" disabled>Choose your business</option>
            <option value="1">Agriculture & Foresty/Wildlife</option>
            <option value="2">Business & Information</option>
            <option value="3">Construction/Utilities/Contracting</option>
            <option value="4">Education</option>
            <option value="5">Finance & Ensurance</option>
            <option value="6">Food & Hospitality</option>
            <option value="7">Gaming</option>
            <option value="8">Health Services</option>
            <option value="9">Motor Vehicle</option>
            <option value="10">Natural Resources/Environmental</option>
            <option value="11">Other</option>
            <option value="12">Personal Services</option>
            <option value="13">Real Estate & Housing</option>
            <option value="14">Safety/Security & Legal</option>
            <option value="15">Transportation</option>
          </select>
          {errors.business_type_id && <span className="validate_span">{errors.business_type_id}</span>}
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
  stateObj: React.PropTypes.object.isRequired,
  userSignupRequest: React.PropTypes.func.isRequired
}

SignupForm2.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default SignupForm2
