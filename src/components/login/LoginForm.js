import React, {Component} from 'react'
import TextFieldGroup from '../signup/TextFieldGroup'
import validateLoginForm from '../../functions/validateLoginForm'
import { Link } from 'react-router'
import update from 'react-addons-update'

class LoginForm extends Component {
  state = {
    login: '',
    password: '',
    errors: {}
  }
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    const {errors, isValid} = validateLoginForm(this.state)
    if (!isValid) {
      const newData = update(this.state.errors, {[e.target.name]: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }
  isValid() {
    const {errors, isValid} = validateLoginForm(this.state)

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
      console.log(this.state);
    }
  }
  render() {
    const {errors} = this.state
    return(
      <form className="auth_form">
        <TextFieldGroup
          value={this.state.login}
          label="Login"
          placeholder="Login"
          type="email"
          field="login"
          onChangeHandler={this.onChangeHandler}
          error={errors.login}
          className="form_group__input"
        />
        <TextFieldGroup
          value={this.state.password}
          label="Password"
          placeholder="******"
          type="password"
          field="password"
          onChangeHandler={this.onChangeHandler}
          error={errors.password}
          className="form_group__input"
        />

        <div className="links">
          <Link to="/forgot" className="redirect">Forgot your password?</Link>

          <Link to="/signup" className="redirect">Signup page</Link>
        </div>

        <div className="form_group">
          <button className="form_group__button" onClick={this.onClickHandler}>Enter</button>
        </div>
      </form>
    )
  }
}

export default LoginForm
