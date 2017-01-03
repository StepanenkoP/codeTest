import React, { Component } from 'react';
import FlashList from '../flash/FlashList'
import SettingsForm from './SettingsForm'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'


class SettingsPage extends Component {
  state = {
    isOpen: false
  }

  componentDidMount= () => {
    document.title = "Settings - Micro Advertising Portal";
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
          title="Settings"
          text="Service which allows you to create advertisements. You can easily manage the process and to increase their sales."
          openMenu={this.openMenu}
          logOut={this.logOut}
        />
        <SettingsForm />
        <Footer />
      </div>
    );
  }
}

SettingsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SettingsPage;
