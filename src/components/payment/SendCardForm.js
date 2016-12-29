import React, { Component } from 'react'
import credit from '../../img/payments/credit.png'
import TextFieldGroup from '../signup/TextFieldGroup'
import update from 'react-addons-update'
import validateStripeForm from '../../functions/validateStripeForm'
import {sendPayment} from '../../AC/paymentAC'
import {addFlashMessage} from '../../AC/flashMessages'
import {connect} from 'react-redux'

class SendCardForm extends Component {
  state = {
    amount: '',
    card_number: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
    errors: {}
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    const {isValid} = validateStripeForm(this.state)
    if (!isValid) {
      const newData = update(this.state.errors, {[e.target.name]: {$set: ''}});
      this.setState({
        errors: newData
      })
    }
  }

  isValid() {
    const {errors, isValid} = validateStripeForm(this.state)

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
      const data = {
        amount: this.state.amount,
        card_number: this.state.card_number,
        exp_month: this.state.exp_month,
        exp_year: this.state.exp_year,
        cvc: this.state.cvc,
      }
      this.props.sendPayment(data).then(
        r => {
          if (r.data.success) {
            this.props.addFlashMessage({
              type: 'success',
              text: 'Payment sent successfully'
            })
            this.setState({
              amount: '',
              card_number: '',
              exp_month: '',
              exp_year: '',
              cvc: '',
              errors: {}
            })
            this.context.router.push('/payments')
          } else {
            this.props.addFlashMessage({
              type: 'error',
              text: "Could not find payment information"
            })
          }
        }
      )
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
          <div className="stripe_form">
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
            <div className="block" style={{float:'left'}}>
              <TextFieldGroup
                value={this.state.card_number}
                label="Card Number"
                placeholder=""
                type="text"
                field="card_number"
                maxlength = "16"
                onChangeHandler={this.onChangeHandler}
                error={errors.card_number}
                className="form_group__input"
              />
            </div>
            <div className="block" style={{float:'right'}}>
              <div className="form_group exp">
                <label className="form_group__label">Expire Date</label>
                <select
                  value={this.state.exp_month}
                  onChange={this.onChangeHandler}
                  name="exp_month"
                  className="form_group__input"
                >
                  <option value="" disabled>mm</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <select
                  value={this.state.exp_year}
                  onChange={this.onChangeHandler}
                  name="exp_year"
                  className="form_group__input year"
                >
                  <option value="" disabled>yy</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                </select>
                {errors.exp_month && <span className="validate_span">{errors.exp_month}</span>}
              </div>
              <div className="cvc">
                <TextFieldGroup
                  value={this.state.cvc}
                  label="Cvc"
                  placeholder=""
                  type="password"
                  field="cvc"
                  onChangeHandler={this.onChangeHandler}
                  error={errors.cvc}
                  maxlength = "3"
                  className="form_group__input"
                />
              </div>
            </div>
            <button className="form_group__button btn_stripe" onClick={this.onClickHandler}>Send Payment</button>
          </div>
        </div>
      </div>
    )
  }
}

SendCardForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, {sendPayment,addFlashMessage})(SendCardForm);
