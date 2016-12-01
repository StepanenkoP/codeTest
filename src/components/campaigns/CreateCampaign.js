import React, {Component} from 'react'
import FlashList from '../flash/FlashList'
import {Link} from 'react-router'
import Footer from '../unisex/Footer'
import MobileMenu from '../unisex/MobileMenu'
import Header from '../unisex/Header'
import CampaignConstructor from './CampaignConstructor'


class CreateCampaign extends Component {
  state = {
    isOpen: false
  }

  componentDidMount= () => {
    document.title = "Create Campaign - Micro Advertising Portal";
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
          title="Create campaign"
          text="Est eu pertinaciaen delacrue instructiol vel eu natum vedi idqran ende salutandi no per."
          openMenu={this.openMenu}
          logOut={this.logOut}
        />
        <CampaignConstructor />
        <Footer />
      </div>
    );
  }
}

CreateCampaign.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default CreateCampaign
