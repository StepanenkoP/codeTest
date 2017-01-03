import React, { Component } from 'react';
import FlashList from '../flash/FlashList'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import PaymentForm from './PaymentForm'



class PaymentPage extends Component {
  state = {
    isOpen: false
  }

  componentDidMount= () => {
    document.title = "Payment - Micro Advertising Portal";
  }

  openMenu = () => {
    this.setState({
      isOpen: true
    })
  }

  closeMenu = () => {
    this.setState({
      isOpen: false
    })
  }

  logOut = () => {
    localStorage.removeItem('token');
    this.context.router.push('/login');
  }
 || this.props.location.pathname !== "/payments/paypal"
  render() {
    console.log(this.props);
    const mobileMenu = this.state.isOpen ? <MobileMenu closeMenu={this.closeMenu}/> : null
    const paymentType = this.props.location.pathname !== "/payments/send"
    ? this.props.location.pathname !== "/payments/card" ? this.props.location.pathname !== "/payments/paypal" ?
    <div className="main_wrapper">
      {mobileMenu}
      <FlashList />
      <Header
        title="Messages"
        text="Service which allows you to create advertisements. You can easily manage the process and to increase their sales."
        openMenu={this.openMenu}
        logOut={this.logOut}
      />
      <PaymentForm />
      <Footer />
    </div> : <div>{this.props.children}</div>
    : <div>{this.props.children}</div>
    : <div>{this.props.children}</div>
    return (
      <div>
        {paymentType}
      </div>
    );
  }
}

PaymentPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default PaymentPage;
