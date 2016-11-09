import React, {Component} from 'react'
import TextFieldGroup from './TextFieldGroup'
import validateInput from '../../functions/validateInput'

class SignupForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    errors: {}
  }
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
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

  onSubmit = (e) => {
    this.setState({
      errors : {}
    })
    e.preventDefault();
    if (this.isValid()) {
      // this.setState({errors});
    }
  }
  render() {
    const {errors} = this.state
    console.log(errors);
    return (
      <form className="auth_form" onSubmit={this.onSubmit}>

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
          placeholder=""
          className="form_group__input"
        />

        <div className="form_group">
          <button className="form_group__button">Next Step</button>
        </div>
      </form>
    )
  }
}

export default SignupForm;
