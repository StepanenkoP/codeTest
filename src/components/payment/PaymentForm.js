import React, { Component } from 'react'
import money from '../../img/payments/money.png'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {loadAllPayments} from '../../AC/paymentAC'
import ring from '../../img/main/ring.svg'


class PaymentForm extends Component {
  componentDidMount() {
    this.props.loadAllPayments()
  }

  render () {
    console.log(this.props);
    const items = this.props.allPayments !== null ? this.props.allPayments.payments.map(item => <div key={item.id}>
      <div className="payment_row passive clearfix">
        <div className="payment_date">{item.created_at.split(' ')[0]}</div>
        <div className="payment_time">{item.created_at.split(' ')[1].slice(0,5)}</div>
        <div className="payment_method">{item.payment_method}</div>
        <div className="payment_id">{item.payment_id}</div>
        <div className="payment_amount">{item.amount}</div>
        <div className="payment_balance">{item.balance_after_transaction}</div>
      </div>
    </div>) : <div style={{textAlign: 'center'}}><img src={ring} alt="alt" style={{paddingBottom: '50px'}}/></div>
    const messages = <div className="messages_wrapper">
      <div className="messages">
        <div className="payment_row clearfix">
          <div className="payment_date">Date</div>
          <div className="payment_time">Time</div>
          <div className="payment_method">Payment Method</div>
          <div className="payment_id">Payment ID</div>
          <div className="payment_amount">Payment Amount</div>
          <div className="payment_balance">Balance</div>
        </div>
        {items}
      </div>
    </div>
    return (
      <div className="settings_wrapper">
        <div className="settings_wrapper__form mess">
          <div className="title clearfix">
            <div className="img_wrapper"><img src={money} alt="alt"/></div>
            Payment
            <Link to="/payments/send"><button className="form_group__button payment_btn">Send Payment</button></Link>
          </div>
          {messages}
          { this.props.allPayments !== null && !this.props.allPayments.payments.length && <div className="no_data" style={{textAlign: 'center'}}>No data</div>}
        </div>
      </div>
    )
  }
}

function mapStateToProps({accountData}) {
  return {
    allPayments: accountData.allPayments
  }
}


export default connect(mapStateToProps, {loadAllPayments})(PaymentForm);
