import React, {Component} from 'react'
import TextFieldGroup from './TextFieldGroup'
import update from 'react-addons-update'
import {Link} from 'react-router'
import validateInput from '../../functions/validateInput'
import SignupForm2 from './SignupForm2'
import {connect} from 'react-redux'
import {userSignupRequest} from '../../AC/signupActions'
import {addFlashMessage} from '../../AC/flashMessages'

class SignupForm extends Component {

  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    errors: {},
    show: false
  }

  onChangeHandler = (e) => {
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value
    })
    const {isValid} = validateInput(this.state)
    if (!isValid) {
      const newData = update(this.state.errors, {[e.target.name]: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }

  isValid() {
    const {errors, isValid} = validateInput(this.state)

    if (!isValid) {
      this.setState({
        errors
      })
    }
    return isValid
  }

  onClickHandler = (e) => {
    console.log(this.state);
    e.preventDefault();
    this.setState({
      errors : {}
    });
    if (this.isValid()) {
      this.setState({
        show: !this.state.show
      });
    }
  }

  backClick = (data) => {
    this.setState({
      show: !this.state.show
    })
    localStorage.setItem('business_type_id', data.business_type_id)
    localStorage.setItem('address', data.address)
    localStorage.setItem('contact_number', data.contact_number)
  }

  render() {
    const {errors} = this.state
    const stateObj = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      show: this.state.show
    }
    const {userSignupRequest, addFlashMessage} = this.props
    console.log(this.props);
    const changeForms = this.state.show ? <SignupForm2 stateObj={stateObj} addFlashMessage={addFlashMessage} backClick={this.backClick} userSignupRequest={userSignupRequest}/> :
    <div>
      <h2>Sign up</h2>
      <TextFieldGroup
        value={this.state.firstname}
        label="First Name"
        placeholder="First Name"
        type="text"
        field="firstname"
        onChangeHandler={this.onChangeHandler}
        error={errors.firstname}
        className="form_group__input"
      />
      <TextFieldGroup
        value={this.state.lastname}
        onChangeHandler={this.onChangeHandler}
        type="text"
        error={errors.lastname}
        label="Last Name"
        field="lastname"
        placeholder="Last Name"
        className="form_group__input"
      />
      <TextFieldGroup
        value={this.state.email}
        onChangeHandler={this.onChangeHandler}
        type="email"
        error={errors.email}
        label="Email Address"
        field="email"
        placeholder="Email"
        className="form_group__input"
      />
      <TextFieldGroup
        value={this.state.password}
        error={errors.password}
        onChangeHandler={this.onChangeHandler}
        label="Password"
        type="password"
        field="password"
        placeholder="******"
        className="form_group__input"
      />

      <div className="links">
        <Link to="/login" className="redirect">Login page</Link>
      </div>


      <div className="form_group">
        <button className="form_group__button" onClick={this.onClickHandler}>Next Step</button>
      </div>
    </div>


    return (
      <form className="auth_form">
        {changeForms}
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null, {userSignupRequest, addFlashMessage})(SignupForm);
