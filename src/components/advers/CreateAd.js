import React, {Component} from 'react'
import FlashList from '../flash/FlashList'
import {Link} from 'react-router'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import AdConstructor from './AdConstructor'


class CreateAd extends Component {
  state = {
    isOpen: false
  }

  componentDidMount= () => {
    document.title = "Create Advertise - Micro Advertising Portal";
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
          title="Create adverts"
          text="Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per."
          openMenu={this.openMenu}
          logOut={this.logOut}
        />
        <AdConstructor />
        <Footer />
      </div>
    );
  }
}

CreateAd.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default CreateAd
