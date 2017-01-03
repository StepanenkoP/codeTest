import React, { Component } from 'react';
import FlashList from '../flash/FlashList'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import SendPaypalForm from './SendPaypalForm'


class SendPaypalPage extends Component {
  state = {
    isOpen: false
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

  render() {
    console.log(this.props.children);
    const mobileMenu = this.state.isOpen ? <MobileMenu closeMenu={this.closeMenu}/> : null
    return (
      <div className="main_wrapper">
        {mobileMenu}
        <FlashList />
        <Header
          title="Payment"
          text="Service which allows you to create advertisements. You can easily manage the process and to increase their sales."
          openMenu={this.openMenu}
          logOut={this.logOut}
        />
        <SendPaypalForm />
        <Footer />
      </div>
    );
  }
}

SendPaypalPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SendPaypalPage;
