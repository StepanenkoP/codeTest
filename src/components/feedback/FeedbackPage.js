import React, { Component } from 'react';
import FlashList from '../flash/FlashList'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import FeedbackForm from './FeedbackForm'


class FeedbackPage extends Component {
  state = {
    isOpen: false
  }

  componentDidMount= () => {
    document.title = "Feedback - Micro Advertising Portal";
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
    const mobileMenu = this.state.isOpen ? <MobileMenu closeMenu={this.closeMenu}/> : null
    return (
      <div className="main_wrapper">
        {mobileMenu}
        <FlashList />
        <Header
          title="Feedback"
          text="Service which allows you to create advertisements. You can easily manage the process and to increase their sales."
          openMenu={this.openMenu}
          logOut={this.logOut}
        />
        <FeedbackForm />
        <Footer />
      </div>
    );
  }
}

FeedbackPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default FeedbackPage;
