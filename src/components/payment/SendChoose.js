import React, { Component } from 'react'
import credit from '../../img/payments/credit.png'
import {Link} from 'react-router'

class SendChoose extends Component {

  render () {
    return (
      <div className="settings_wrapper">
        <div className="settings_wrapper__form">
          <div className="title">
            <div className="img_wrapper"><img src={credit} alt="alt"/></div>
            Choose Payment
          </div>
          <div className="payment_types">
            <Link to="/payments/card"><div className="type card" onClick={this.cardClick}></div></Link>
            <div className="type paypal"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default SendChoose;
