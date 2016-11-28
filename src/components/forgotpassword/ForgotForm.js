import React, {Component} from 'react'
import TextFieldGroup from '../signup/TextFieldGroup'
import validateForgotForm from '../../functions/validateForgotForm'
import { Link } from 'react-router'
import update from 'react-addons-update'
import {connect} from 'react-redux'
import {userForgotPasswordRequest} from '../../AC/signupActions'
import {addFlashMessage} from '../../AC/flashMessages'

class ForgotForm extends Component {
  state = {
    email: '',
    errors: {}
  }
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    const {isValid} = validateForgotForm(this.state)
    if (!isValid) {
      const newData = update(this.state.errors, {[e.target.name]: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }
  isValid() {
    const {errors, isValid} = validateForgotForm(this.state)

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
      console.log(this.state.email);
      this.props.userForgotPasswordRequest({email: this.state.email}).then(
        (r) => {
          console.log(r);
          if (r.data.success == true) {
            this.props.addFlashMessage({
              type: 'success',
              text: 'Success! Visit your email!'
            })
            this.context.router.push('/login')
          }
          if (r.data.error) {
            this.props.addFlashMessage({
              type: 'error',
              text: 'This email does not exist'
            })
          }
        }
      )
    }
  }
  render() {
    const {errors} = this.state
    return(
      <form className="auth_form">
        <h2>Forgot Password</h2>
        <TextFieldGroup
          value={this.state.email}
          label="Email"
          placeholder="Email"
          type="email"
          field="email"
          onChangeHandler={this.onChangeHandler}
          error={errors.email}
          className="form_group__input"
        />

        <div className="links">
          <Link to="/login" className="redirect">Login page</Link>

          <Link to="/signup" className="redirect">Signup page</Link>
        </div>

        <div className="form_group">
          <button className="form_group__button" onClick={this.onClickHandler}>Send</button>
        </div>
      </form>
    )
  }
}

ForgotForm.propTypes = {
  userForgotPasswordRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
}

ForgotForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, {userForgotPasswordRequest, addFlashMessage})(ForgotForm)
