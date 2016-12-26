import React, { Component } from 'react'
import credit from '../../img/payments/credit.png'
import TextFieldGroup from '../signup/TextFieldGroup'
import update from 'react-addons-update'
import validatePaypalForm from '../../functions/validatePaypalForm'
import {sendPayment} from '../../AC/paymentAC'
import {addFlashMessage} from '../../AC/flashMessages'
import {connect} from 'react-redux'

class SendPaypalForm extends Component {
  state = {
    amount: '',
    errors: {}
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    const {isValid} = validatePaypalForm(this.state)
    if (!isValid) {
      const newData = update(this.state.errors, {[e.target.name]: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }

  isValid() {
    const {errors, isValid} = validatePaypalForm(this.state)

    if (!isValid) {
      this.setState({
        errors
      })
    }
    return isValid
  }

  onSubmitHandler = (e) => {
    this.setState({
      errors : {}
    });
    if (!this.isValid()) {
      e.preventDefault();
    }
  }

  render () {
    const {errors} = this.state
    return (
      <div className="settings_wrapper">
        <div className="settings_wrapper__form">
          <div className="title">
            <div className="img_wrapper"><img src={credit} alt="alt"/></div>
            Send Payment
          </div>
          <form className="stripe_form" action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" onSubmit={this.onSubmitHandler}>
            <input type="hidden" name="cmd" value="_xclick"/>
            <input type="hidden" name="business" value="foxpay-facilitator@midwinter-map.com"/>
            <input type="hidden" name="item_name" value="Payment"/>
            <input type="hidden" name="currency_code" value="GBP"/>
            <TextFieldGroup
              value={this.state.amount}
              label="Amount"
              placeholder=""
              type="text"
              field="amount"
              onChangeHandler={this.onChangeHandler}
              error={errors.amount}
              className="form_group__input"
            />
            <button className="form_group__button btn_stripe">Send Payment</button>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(null, {sendPayment,addFlashMessage})(SendPaypalForm);
