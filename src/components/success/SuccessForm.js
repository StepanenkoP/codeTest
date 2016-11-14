import React, {Component} from 'react'
import Cup from '../../img/signup/Cup.png'
import { Link } from 'react-router'

class SuccessForm extends Component {
  render() {
    return (
      <form className="auth_form">
        <div className="img_wrapper">
          <img src={Cup} alt=""/>
        </div>
        <h3>You have successfully confirmed your email</h3>
        <div className="form_group">
          <Link to='/login' className="form_group__button in_btn">Login</Link>
        </div>
      </form>
    )
  }
}

export default SuccessForm;
