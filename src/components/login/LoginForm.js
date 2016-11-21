import React, {Component} from 'react'
import TextFieldGroup from '../signup/TextFieldGroup'
import validateLoginForm from '../../functions/validateLoginForm'
import { Link } from 'react-router'
import update from 'react-addons-update'
import {connect} from 'react-redux'
import {userLoginRequest, userActivateRequest} from '../../AC/signupActions'

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
    const {isValid} = validateLoginForm(this.state)
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
      const loginObj = {
        email: this.state.login,
        password: this.state.password,
      }
      this.props.userLoginRequest(loginObj).then(
        (response) => {
          console.log(response);
          if (response.data.error) {
            alert(response.data.error);
            this.props.userActivateRequest().then(
              res => {
                console.log(res)
                this.context.router.push('/success')
              }
            )
          }
          if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            this.context.router.push('/')
          }
        }
      ).catch((err) => {
        if (err.response.data.error == "invalid_credentials") {
          alert("Invalid email or password!");
        }
      })
    }
  }
  render() {
    const {errors} = this.state
    return(
      <form className="auth_form">
        <h2>Log In</h2>
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

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, {userLoginRequest, userActivateRequest})(LoginForm)
